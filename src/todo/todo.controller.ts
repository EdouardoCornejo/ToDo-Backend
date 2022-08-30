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
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/user/jwt/jwt-auth.guard';
import Request from '../types/types';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Login token required' })
@ApiInternalServerErrorResponse({ description: 'Contact server admin' })
@UseGuards(JwtAuthGuard)
@Controller('todo')
export class TodoController {
  private logger = new Logger('TodoController');
  constructor(private readonly todoService: TodoService) {}

  @ApiCreatedResponse({ description: 'New task created' })
  @ApiBadRequestResponse({ description: 'Task not created' })
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
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Contact server admin',
      });
    }
  }

  @ApiAcceptedResponse({ description: 'Obtained ToDo records' })
  @ApiNotFoundResponse({ description: 'ToDo records not obtained' })
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

  @ApiAcceptedResponse({ description: 'Obtained ToDo record' })
  @ApiNotFoundResponse({ description: 'ToDo record not obtained' })
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

  @ApiAcceptedResponse({ description: 'Updated ToDo record' })
  @ApiBadRequestResponse({ description: 'ToDo could not update' })
  @ApiNotFoundResponse({ description: 'ToDo not found' })
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
      if (error.code === 'P2025') {
        res.status(HttpStatus.NOT_FOUND).json({
          error: 'The task does not exist',
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          error: 'Contact server admin',
        });
      }
    }
  }

  @ApiAcceptedResponse({ description: 'ToDo deleted' })
  @ApiBadRequestResponse({ description: 'ToDo could not deleted' })
  @ApiNotFoundResponse({ description: 'ToDo not found' })
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
      console.log(error);
      if (error.code === 'P2025') {
        res.status(HttpStatus.NOT_FOUND).json({
          error: 'The task does not exist',
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          error: 'Contact server admin',
        });
      }
    }
  }

  @ApiAcceptedResponse({ description: `ToDo's deleted` })
  @ApiBadRequestResponse({ description: `ToDo's could not deleted` })
  @ApiNotFoundResponse({ description: `ToDo's  not found` })
  @ApiNoContentResponse({ description: `Uncompleted tasks not found` })
  @Delete()
  async clearCompleted(@Res() res: Response, @Req() req: Request) {
    try {
      const todo = await this.todoService.clearCompleted(req.user.id);
      res.status(HttpStatus.ACCEPTED).json(todo);
    } catch (error) {
      this.logger.error(error.code);
      console.log(error);
      if (error.code === 'P2025') {
        res.status(HttpStatus.NOT_FOUND).json({
          error: 'The task does not exist',
        });
      } else if (error === '401') {
        res.status(HttpStatus.NO_CONTENT).json({
          error: `You don't have completed tasks to delete`,
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          error: 'Contact server admin',
        });
      }
    }
  }
}
