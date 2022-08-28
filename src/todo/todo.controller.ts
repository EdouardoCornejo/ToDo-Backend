import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  HttpStatus,
  Logger,
  Req,
  Put,
  Delete,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Response } from 'express';
import Request from '../types/types';

@Controller('todo')
export class TodoController {
  private logger = new Logger('TodoController');
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(
    @Body() dto: CreateTodoDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    try {
      const todo = await this.todoService.create({
        ...dto,
        User: {
          connect: {
            id: req.user.id,
          },
        },
      });
      res.status(HttpStatus.CREATED).json(todo);
    } catch (error) {
      this.logger.error(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Contact server admin',
      });
    }
  }

  @Get()
  async findAll(@Res() res: Response, @Req() req: Request) {
    try {
      const todo = await this.todoService.findAll(req.user.id);
      res.status(HttpStatus.ACCEPTED).json(todo);
    } catch (error) {
      this.logger.error(error.code);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Contact server admin',
      });
    }
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    try {
      const todo = await this.todoService.findOne(id, req.user.id);
      res.status(HttpStatus.ACCEPTED).json(todo);
    } catch (error) {
      this.logger.error(error.code);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Contact server admin',
      });
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    try {
      const todo = await this.todoService.update(
        id,
        req.user.id,
        updateTodoDto,
      );
      res.status(HttpStatus.ACCEPTED).json(todo);
    } catch (error) {
      this.logger.error(error.code);
      if (error.code === 'P2025') {
        res.status(HttpStatus.BAD_REQUEST).json({
          error: 'The task does not',
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          error: 'Contact server admin',
        });
      }
    }
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    try {
      const todo = await this.todoService.remove(id, req.user.id);
      res.status(HttpStatus.ACCEPTED).json(todo);
    } catch (error) {
      this.logger.error(error.code);
      if (error.code === 'P2025') {
        res.status(HttpStatus.BAD_REQUEST).json({
          error: 'The task does not exist',
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          error: 'Contact server admin',
        });
      }
    }
  }

  @Delete()
  async clearCompleted(@Res() res: Response, @Req() req: Request) {
    try {
      const todo = await this.todoService.clearCompleted(req.user.id);
      res.status(HttpStatus.ACCEPTED).json(todo);
    } catch (error) {
      this.logger.error(error.code);
      if (error.code === 'P2025') {
        res.status(HttpStatus.BAD_REQUEST).json({
          error: 'The task does not exist',
        });
      }
      if (error === '401') {
        res.status(HttpStatus.NOT_FOUND).json({
          error: `You don't have completed task to delete`,
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          error: 'Contact server admin',
        });
      }
    }
  }
}
