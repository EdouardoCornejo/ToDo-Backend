import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';

/* Importing the PrismaModule, TodoController, and TodoService. */
@Module({
  imports: [PrismaModule],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
