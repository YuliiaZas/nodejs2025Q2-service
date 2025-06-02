import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

export function createSwaggerDocument(app: INestApplication): OpenAPIObject {
  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('API for managing music albums, artists, and tracks')
    .setVersion('1.0')
    .build();

  return SwaggerModule.createDocument(app, config);
}
