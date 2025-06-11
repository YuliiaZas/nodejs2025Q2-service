import { NestFactory } from '@nestjs/core';

import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { SwaggerModule } from '@nestjs/swagger';

import { LoggingService } from '@/shared';

import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './shared/exseptions/global-exception.filter';
import { createSwaggerDocument } from './shared/swagger/swagger.config';

import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(LoggingService));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new GlobalExceptionFilter(app.get(LoggingService)));

  const document = createSwaggerDocument(app);
  SwaggerModule.setup('doc', app, document);

  const port = process.env.PORT || 4000;

  await app.listen(port, () => {
    app.get(LoggingService).log(`Application started at port ${port}`);
  });
}

bootstrap();
