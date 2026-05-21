import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strip unknown fields
      forbidNonWhitelisted: true, // throw error if unknown fields exist
      transform: true, // auto-transform payloads
    }),
  );

  const port = process.env.PORT ?? 3000;
  await app.listen(port, () => {
    console.log(`🐨 App listening on port ${port}`);
  });
}

bootstrap();
