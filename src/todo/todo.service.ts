import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma, Todo } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  private prisma: PrismaService;

  constructor(prisma: PrismaService) {
    this.prisma = prisma;
  }

  create(data: Prisma.TodoCreateInput): Promise<Todo> {
    return this.prisma.todo.create({
      data,
    });
  }

  findAll(userId: string): Promise<Array<Todo>> {
    return this.prisma.todo.findMany({
      where: { userId },
    });
  }

  async findOne(id: string, userId: string) {
    const todo = await this.prisma.todo.findUnique({ where: { id } });
    if (todo.userId !== userId)
      throw new UnauthorizedException(
        'Your are not authorized to search this Todo',
      );
  }

  async update(id: string, userId: string, data: UpdateTodoDto) {
    const todo = await this.prisma.todo.findUnique({ where: { id } });
    if (todo.userId !== userId)
      throw new UnauthorizedException(
        'You are not authorized to update this Todo',
      );
    return this.prisma.todo.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: string, userId: string): Promise<Todo> {
    const todo = await this.prisma.todo.findUnique({ where: { id } });
    if (todo.userId !== userId)
      throw new UnauthorizedException(
        'You are not authorized to delete this task',
      );
    return this.prisma.todo.delete({
      where: {
        id,
      },
    });
  }

  async clearCompleted(userId: string) {
    const todo = await this.prisma.todo.deleteMany({
      where: { userId, completed: true },
    });
    if (todo.count < 1)
      throw new UnauthorizedException(
        `You don't have completed tasks to delete`,
      );
  }
}
