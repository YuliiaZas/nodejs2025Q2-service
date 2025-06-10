import { Injectable } from '@nestjs/common';

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

const BYTES_IN_KB = 1024;
const MAX_LOG_SIZE_KB = Number(process.env.LOG_FILE_MAX_SIZE_KB || 1);
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
const LEVELS = ['error', 'warn', 'info', 'debug'] as const;

type LogLevel = (typeof LEVELS)[number];

@Injectable()
export class LoggerService {
  private logStream = this.initStream();
  private isFileRotating = false;

  constructor() {
    process.on('exit', () => {
      this.logStream.end();
    });
  }

  info(message: string, info?: Record<string, any>) {
    this.log('info', message, info);
  }

  warn(message: string, info?: Record<string, any>) {
    this.log('warn', message, info);
  }

  error(message: string, info?: Record<string, any>) {
    this.log('error', message, info);
  }

  debug(message: string, info?: Record<string, any>) {
    this.log('debug', message, info);
  }

  private initStream(): WriteStream {
    if (!existsSync(logDir)) {
      mkdirSync(logDir, { recursive: true });
    }
    return createWriteStream(logFilePath, { flags: 'a' });
  }

  private log(
    level: LogLevel,
    message: string,
    info?: Record<string, any>,
  ): void {
    if (!this.shouldLog(level)) return;

    const formattedMessage = this.formatMessage(level, message, info);

    if (this.isFileRotating) {
      console.warn('Log skipped during rotation');
      return;
    }

    this.rotateFileIfNeeded(() => {
      this.logStream.write(formattedMessage, (err) => {
        if (err) {
          console.error('Write error:', err);
        }
      });
      console.log(formattedMessage.trim());
    });
  }

  private formatMessage(
    level: LogLevel,
    message: string,
    info?: Record<string, any>,
  ): string {
    const time = new Date().toISOString();
    const formattedMessage = `${message}${info ? ' ' + JSON.stringify(info, null, 2) : ''}`;
    return `[${time}] [${level.toUpperCase()}] ${formattedMessage}\n`;
  }

  private rotateFileIfNeeded(callback: () => void): void {
    try {
      const stats = statSync(logFilePath);
      const maxSizeInBytes = MAX_LOG_SIZE_KB * BYTES_IN_KB;

      if (stats.size >= maxSizeInBytes) {
        this.isFileRotating = true;

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const rotatedLogFilePath = join(logDir, `app-${timestamp}.log`);

        this.logStream.end(() => {
          renameSync(logFilePath, rotatedLogFilePath);

          this.logStream = createWriteStream(logFilePath, { flags: 'a' });
          this.isFileRotating = false;

          console.log(`Log file rotated: ${rotatedLogFilePath}`);
          callback();
        });
      } else {
        callback();
      }
    } catch (err) {
      if (err.code !== 'ENOENT') {
        console.error('Error checking log file size:', err);
      } else {
        console.error('Log rotation failed:', err);
      }
      callback();
    }
  }

  private shouldLog(level: LogLevel): boolean {
    let currentLevelIndex = LEVELS.indexOf(LOG_LEVEL as LogLevel);
    if (currentLevelIndex === -1) {
      currentLevelIndex = LEVELS.indexOf('info');
    }
    const logLevelIndex = LEVELS.indexOf(level);
    return logLevelIndex <= currentLevelIndex;
  }
}
