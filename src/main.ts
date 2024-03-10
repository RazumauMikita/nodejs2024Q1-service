import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { parse } from 'yaml';
import { readFile } from 'fs/promises';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const file = await readFile(join(__dirname, '../doc/api.yaml'), 'utf-8');
  const swaggerDocument = parse(file);

  SwaggerModule.setup('docs', app, swaggerDocument);

  await app.listen(4000);
}
bootstrap();
