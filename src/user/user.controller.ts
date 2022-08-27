import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('user')
export class UserController {
  private logger = new Logger('UserController');
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async registerUser(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ) {
    try {
      const user = await this.userService.register(createUserDto);
      res.status(HttpStatus.OK).json(user);
    } catch (error) {
      this.logger.error(error.code);
      if (error.code === 'P2002') {
        res.status(HttpStatus.BAD_REQUEST).json({
          error: 'User was already created',
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          error: 'Contact Server Admin',
        });
      }
    }
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginAuthDto, @Res() res: Response) {
    try {
      const user = await this.userService.login(loginUserDto);
      res.status(HttpStatus.OK).json(user);
    } catch (error) {
      this.logger.error(error.code);
      if (error.code === 'P2002') {
        res.status(HttpStatus.BAD_REQUEST).json({
          error: 'User was already created',
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          error: 'Contact Server Admin',
        });
      }
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const user = await this.userService.findAll();
      res.status(HttpStatus.FOUND).json(user);
    } catch (error) {
      this.logger.error(error.code);
      res.status(HttpStatus.BAD_REQUEST).json({
        error: 'Contact Server Admin',
      });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const user = await this.userService.findOne(id);
      res.status(HttpStatus.OK).json(user);
    } catch (error) {
      this.logger.error(error.code);
      res.status(HttpStatus.BAD_REQUEST).json({
        error: 'Contact Server Admin',
      });
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    try {
      const user = await this.userService.update(id, updateUserDto);
      res.status(HttpStatus.OK).json(user);
    } catch (error) {
      this.logger.error(error.code);
      if (error.code === 'P2025') {
        res.status(HttpStatus.BAD_REQUEST).json({
          error: ' User not exist',
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          error: 'Contact Server Admin',
        });
      }
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const user = await this.userService.remove(id);
      res.status(HttpStatus.OK).json(user);
    } catch (error) {
      this.logger.error(error.code);
      if (error.code === 'P2025') {
        res.status(HttpStatus.BAD_REQUEST).json({
          error: 'User has already been deleted',
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          error: 'Contact Server Admin',
        });
      }
    }
  }
}
