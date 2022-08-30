import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  /* It creates an instance of the Nest application. */
  const logger = new Logger('NestApplication');
  const app = await NestFactory.create(AppModule);

  /* It allows the app to be accessed from any domain. */
  app.enableCors();

  /* Creating a swagger documentation for the app. */
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

  /* A global pipe that validates the data that is sent to the server. */
  app.useGlobalPipes(new ValidationPipe());

  /* Telling the app to listen to port 4000. */
  await app.listen(4000);
  /* Logging the port that the app is running on. */
  logger.log('Nestapp run in port  4000');
  logger.log('Swagger run in port  4000/Documentation');
}
bootstrap();
