import { Injectable, NestMiddleware } from '@nestjs/common';

import { NextFunction, Request, Response } from 'express';

import { maskSensitiveFields } from '../utils/mask-sensitive-fields';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, query, body } = req;
    const startTime = Date.now();

    res.on('finish', () => {
      this.logger.info(`Request: ${method} ${originalUrl}`, {
        query,
        body: maskSensitiveFields(body),
        statusCode: res.statusCode,
        durationMs: Date.now() - startTime,
      });
    });

    next();
  }
}
