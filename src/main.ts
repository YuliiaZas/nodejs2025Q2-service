import { NestFactory } from '@nestjs/core';

import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { SwaggerModule } from '@nestjs/swagger';

import { log } from '@/shared';

import { AppModule } from './app.module';
import { createSwaggerDocument } from './shared/swagger/swagger.config';

import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const document = createSwaggerDocument(app);
  SwaggerModule.setup('doc', app, document);

  await app.listen(process.env.PORT || 4000);

  log(`Application started at port ${process.env.PORT || 4000}`);
}
bootstrap();
