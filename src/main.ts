import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpExceptionFilter } from './utils/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    credentials: true,
    origin: ['http://localhost:3000'],
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(8080);
}

bootstrap();
