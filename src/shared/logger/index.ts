import { createWriteStream, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const rootDir = process.cwd();

const logDir = join(rootDir, 'logs');
if (!existsSync(logDir)) {
  mkdirSync(logDir, { recursive: true });
}

const logStream = createWriteStream(join(logDir, 'app.log'), {
  flags: 'a',
});

process.on('exit', () => {
  logStream.end();
});

export function log(message: string) {
  const time = new Date().toISOString();
  const entry = `[${time}] ${message}\n`;

  logStream.write(entry, (err) => {
    if (err) console.error('Write error:', err);
  });
  console.log(entry);
}
