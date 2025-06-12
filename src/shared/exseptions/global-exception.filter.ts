import { BaseExceptionFilter } from '@nestjs/core';

import {
  ArgumentsHost,
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
      // This logs only uncaught exceptions
      this.logger.error(
        `Exception during request ${method} ${url}`,
        (exception as any).stack || message,
      );
    } else {
      // This logs all other exceptions, including BadRequestException
      // which are not considered as errors. Available only in verbose log level.
      this.logger.verbose(
        `Exception during request ${method} ${url}\n${(exception as any).stack || message}`,
      );
    }

    const responseObject: ResponseObject = {
      message,
      error,
      statusCode,
    };

    response.status(responseObject.statusCode).json(responseObject);
  }
}
