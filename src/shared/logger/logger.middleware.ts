import { Injectable, NestMiddleware } from '@nestjs/common';

import { NextFunction, Request, Response } from 'express';

import { maskSensitiveFields } from '../utils/mask-sensitive-fields';
import { LoggingService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();
    const { method, originalUrl, query, body } = req;
    let responseBody: string;

    const originalSend = res.send.bind(res);
    res.send = (body: any) => {
      responseBody = maskSensitiveFields(body);
      return originalSend(body);
    };

    res.on('finish', () => {
      this.logger.log(`Request: ${method} ${originalUrl}`, {
        info: {
          query,
          body: maskSensitiveFields(body),
          statusCode: res.statusCode,
          durationMs: Date.now() - startTime,
        },
      });
      if (responseBody) {
        this.logger.debug('Response Body:', { info: responseBody });
      }
    });

    res.on('error', (error) => {
      this.logger.error(
        `Error during request: ${method} ${originalUrl}: ${error.message}`,
        error.stack,
      );
    });

    next();
  }
}
