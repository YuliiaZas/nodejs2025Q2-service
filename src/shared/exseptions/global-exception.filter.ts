import { BaseExceptionFilter } from '@nestjs/core';

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { LoggingService } from '../logger';

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
    const request = context.getRequest();

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
        `Exception during request ${request.method} ${request.url}`,
        (exception as any).stack || message,
      );
    } else {
      this.logger.verbose(
        `Exception during request ${request.method} ${request.url}\n${(exception as any).stack || message}`,
      );
    }

    response.status(statusCode).json({
      message,
      error,
      statusCode,
    });
  }
}
