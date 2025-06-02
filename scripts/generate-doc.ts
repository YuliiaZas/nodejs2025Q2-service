import { NestFactory } from '@nestjs/core';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { AppModule } from 'src/app.module';
import { createSwaggerDocument } from 'src/shared/swagger/swagger.config';
import * as yaml from 'yaml';

async function generateSwaggerDoc() {
  const app = await NestFactory.create(AppModule);
  const document = createSwaggerDocument(app);

  const outputPath = resolve(__dirname, '..', '..', 'doc');
  if (!existsSync(outputPath)) {
    mkdirSync(outputPath);
  }

  const yamlData = yaml.stringify(document);
  writeFileSync(join(outputPath, 'api.yaml'), yamlData, 'utf8');

  await app.close();
}

generateSwaggerDoc()
  .then(() =>
    console.log('Swagger YAML documentation generated in /doc/api.yaml'),
  )
  .catch((error) =>
    console.error('Error generating Swagger documentation:', error),
  );
