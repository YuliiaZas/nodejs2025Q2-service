import { ConsoleLogger, Injectable } from '@nestjs/common';

import {
  createWriteStream,
  existsSync,
  mkdirSync,
  renameSync,
  statSync,
  WriteStream,
} from 'node:fs';
import { join } from 'node:path';

const rootDir = process.cwd();
const logDir = join(rootDir, 'logs');
const logFilePath = join(logDir, 'app.log');
const errorLogFilePath = join(logDir, 'error.log');

const BYTES_IN_KB = 1024;
const MAX_LOG_SIZE_KB = Number(process.env.LOG_FILE_MAX_SIZE_KB || 1);
const LOG_LEVEL_INDEX = Number(process.env.LOG_LEVEL_INDEX) || 2;
const LEVELS = ['error', 'warn', 'log', 'debug', 'verbose'] as const;

type LogLevel = (typeof LEVELS)[number];

@Injectable()
export class LoggingService extends ConsoleLogger {
  private logStream = this.initStream();
  private errorLogStream = this.initStream(true);
  private isFileRotating = false;

  constructor() {
    super();

    this.options.logLevels = LEVELS.slice(0, LOG_LEVEL_INDEX + 1);

    process.on('exit', () => {
      this.logStream.end();
      this.errorLogStream.end();
    });

    process.on('uncaughtException', (error) => {
      this.error(`Uncaught Exception:, ${error.message}`, error.stack);
    });

    process.on('unhandledRejection', (reason, promise) => {
      this.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
    });
  }

  log(message: string, data?: any) {
    data ? super.log(message, data) : super.log(message);
    this.writeLogToFile('log', message, {
      ...(typeof data === 'string' && { context: data }),
      ...(data && typeof data !== 'string' && { info: data }),
    });
  }

  warn(message: string) {
    super.warn(message);
    this.writeLogToFile('warn', message);
  }

  error(message: string, stack?: string) {
    super.error(message, stack);
    this.writeLogToFile('error', message, { info: stack });
  }

  debug(message: string, info?: any) {
    info ? super.debug(message, info) : super.debug(message);
    this.writeLogToFile('debug', message, info);
  }

  private initStream(isError = false): WriteStream {
    if (!existsSync(logDir)) {
      mkdirSync(logDir, { recursive: true });
    }
    return createWriteStream(isError ? errorLogFilePath : logFilePath, {
      flags: 'a',
    });
  }

  private updateStream(isError = false): void {
    const newStream = this.initStream(isError);
    isError ? (this.errorLogStream = newStream) : (this.logStream = newStream);
  }

  private writeLogToFile(
    level: LogLevel,
    message: string,
    data?: { info?: Record<string, any> | string; context?: string },
  ): void {
    if (!this.isLevelEnabled(level)) return;

    const formattedMessage = this.formatMessageForFile(level, message, data);

    if (this.isFileRotating) {
      super.warn('Log skipped during rotation');
      return;
    }

    this.rotateFileIfNeeded(() =>
      this.logStream.write(formattedMessage, (err) => {
        if (err) super.error('Log write error:', err);
      }),
    );

    if (level === 'error') {
      this.rotateFileIfNeeded(
        () =>
          this.errorLogStream.write(formattedMessage, (err) => {
            if (err) super.error('Error log write error:', err);
          }),
        true,
      );
    }
  }

  private formatMessageForFile(
    level: LogLevel,
    message: string,
    data?: { info?: Record<string, any> | string; context?: string },
  ): string {
    const time = new Date()
      .toISOString()
      .replace('T', ' ')
      .replace('Z', ' UTC');

    const formattedMessage =
      this.stringifyContext(data?.context) +
      message +
      this.stringifyInfo(data?.info);

    return `[${time}] [${level.toUpperCase()}] ${formattedMessage}\n`;
  }

  private rotateFileIfNeeded(callback: () => void, isError = false): void {
    const currentLogFilePath = isError ? errorLogFilePath : logFilePath;
    const currentLogStream = isError ? this.errorLogStream : this.logStream;

    try {
      const stats = statSync(currentLogFilePath);
      const maxSizeInBytes = MAX_LOG_SIZE_KB * BYTES_IN_KB;

      if (stats.size >= maxSizeInBytes) {
        this.isFileRotating = true;

        const rotatedLogFilePath = this.getFileName();

        currentLogStream.end(() => {
          renameSync(currentLogFilePath, rotatedLogFilePath);

          this.updateStream(isError);
          this.isFileRotating = false;

          super.log(
            `${isError ? 'Error ' : ''}Log file rotated: ${rotatedLogFilePath}`,
          );

          callback();
        });
      } else {
        callback();
      }
    } catch (err) {
      super.error('Log rotation failed:', err);

      callback();
    }
  }

  private stringifyInfo(info?: Record<string, any> | string): string {
    if (!info) return '';

    try {
      const infoString =
        typeof info === 'string' ? info : JSON.stringify(info, null, 2);
      return '\n' + infoString;
    } catch (error) {
      super.error('Error stringifying info:', error);
      return '';
    }
  }

  private stringifyContext(context?: string): string {
    return `${context ? `[${context}] ` : ''}`;
  }

  private getFileName(): string {
    const timestamp = new Date()
      .toISOString()
      .replace(/[:.]/g, '-')
      .replace('T', '_')
      .replace('Z', '');

    return join(logDir, `app_${timestamp}.log`);
  }
}
