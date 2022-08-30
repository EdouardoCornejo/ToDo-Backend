import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('NestApplication');
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('ToDo App')
    .setDescription(
      'This app allows you to: create accounts, login to accounts, create tasks, set the due date for these tasks and mark them as completed',
    )
    .setVersion('1.0')
    .addTag(`ToDo's`)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('Documentation', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(4000);
  logger.log('Nestapp run in port  4000');
  logger.log('Swagger run in port  4000/Documentation');
}
bootstrap();
