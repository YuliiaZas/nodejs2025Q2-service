import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
// import { join, resolve } from 'node:path';
// import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
// import * as yaml from 'yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('API for managing music albums, artists, and tracks')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // const outputPath = resolve(__dirname, '..', 'doc');
  // if (!existsSync(outputPath)) {
  //   mkdirSync(outputPath);
  // }
  // const yamlData = yaml.stringify(document);
  // writeFileSync(join(outputPath, 'api.yaml'), yamlData, 'utf8');

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
