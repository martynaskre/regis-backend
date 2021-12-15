import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import getLogLevels from './utils/getLogLevels';
import { ValidationPipe } from '@nestjs/common';
import { formatValidationErrors } from './utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: getLogLevels(process.env.NODE_ENV === 'production'),
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: formatValidationErrors,
    }),
  );
  app.enableCors();
  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
