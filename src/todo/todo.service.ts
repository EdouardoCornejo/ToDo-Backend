import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma, Todo } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  /* A private property of the class. */
  private prisma: PrismaService;

  constructor(prisma: PrismaService) {
    this.prisma = prisma;
  }

  /**
   * It creates a new todo in the database
   * @param data - Prisma.TodoCreateInput
   * @returns A promise of a Todo object
   */
  create(data: Prisma.TodoCreateInput): Promise<Todo> {
    return this.prisma.todo.create({
      data,
    });
  }

  /**
   * "Find all todos where the userId is equal to the userId passed in as an argument."
   *
   * The findMany function is a Prisma Client function that returns a promise. The promise resolves to an
   * array of todos
   * @param {string} userId - The userId of the user who created the todo.
   * @returns An array of Todo objects
   */
  findAll(userId: string): Promise<Array<Todo>> {
    return this.prisma.todo.findMany({
      where: { userId },
    });
  }

  /**
   * If the userId of the todo we're trying to find doesn't match the userId of the user who's trying to
   * find it, throw an error
   * @param {string} id - The id of the Todo we want to find
   * @param {string} userId - The userId of the user who is making the request.
   */
  async findOne(id: string, userId: string) {
    const todo = await this.prisma.todo.findUnique({ where: { id } });
    if (todo.userId !== userId)
      throw new UnauthorizedException(
        'Your are not authorized to search this Todo',
      );
  }

  /**
   * We're finding a Todo by its id, checking if the userId of the Todo matches the userId of the user
   * who's trying to update it, and if it does, we're updating the Todo with the data that was passed in
   * @param {string} id - The id of the Todo we want to update
   * @param {string} userId - The userId of the user who is making the request.
   * @param {UpdateTodoDto} data - UpdateTodoDto
   * @returns The updated todo
   */
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

  /**
   * We find the Todo by its id, check if the userId of the Todo matches the userId of the user who is
   * trying to delete the Todo, and if it does, we delete the Todo
   * @param {string} id - The id of the Todo we want to delete
   * @param {string} userId - The userId of the user who is making the request.
   * @returns The return type is a Promise<Todo>
   */
  async remove(id: string, userId: string) {
    const todo = await this.prisma.todo.findUnique({ where: { id } });
    if (todo.userId !== userId)
      throw new UnauthorizedException(
        'You are not authorized to delete this Todo',
      );
    return this.prisma.todo.delete({
      where: {
        id,
      },
    });
  }

  /**
   * It deletes all the completed tasks of a user
   * @param {string} userId - The userId of the user who is deleting the todo.
   */
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
