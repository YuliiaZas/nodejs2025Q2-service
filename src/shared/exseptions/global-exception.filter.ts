import { BaseExceptionFilter } from '@nestjs/core';

import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { LoggingService } from '../logger';

type ResponseObject = {
  message: unknown;
  error: string;
  statusCode: number;
};

@Catch()
export class GlobalExceptionFilter<T>
  extends BaseExceptionFilter
  implements ExceptionFilter
{
  constructor(private logger: LoggingService) {
    super();
  }

  catch(exception: T, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const { url, method } = context.getRequest();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody =
      exception instanceof HttpException ? exception.getResponse() : exception;

    const message = responseBody['message'] || JSON.stringify(responseBody);
    const error =
      responseBody['error'] || responseBody['name'] || 'Internal Server Error';

    if (statusCode >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        `Exception during request ${method} ${url}`,
        (exception as any).stack || message,
      );
    } else {
      this.logger.verbose(
        `Exception during request ${method} ${url}\n${(exception as any).stack || message}`,
      );
    }

    const responseObject: ResponseObject = this.getCustomResponseObject(
      exception,
      url,
      method,
      message,
    ) || {
      message,
      error,
      statusCode,
    };

    response.status(responseObject.statusCode).json(responseObject);
  }

  getCustomResponseObject(
    exception: T,
    url: string,
    method: string,
    message: unknown,
  ): null | ResponseObject {
    if (
      exception instanceof BadRequestException &&
      url === '/auth/refresh' &&
      method === 'POST'
    ) {
      const isMissingToken =
        Array.isArray(message) &&
        message.includes('refreshToken should not be empty');

      if (isMissingToken) {
        this.logger.verbose(
          `Type of exeption was changed to UnauthorizedException for ${method} ${url}`,
        );
        return {
          message: 'Refresh token is required',
          error: 'Unauthorized',
          statusCode: HttpStatus.UNAUTHORIZED,
        };
      }
    }
    return null;
  }
}
