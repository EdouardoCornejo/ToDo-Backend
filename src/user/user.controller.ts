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
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { createUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiFoundResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiInternalServerErrorResponse({ description: 'Contact server admin' })
@Controller('user')
export class UserController {
  private logger = new Logger('UserController');
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({ description: 'User has been successfully register.' })
  @ApiBadRequestResponse({ description: 'User cannot register' })
  @Post('register')
  async registerUser(
    @Body() createUserDto: createUserDto,
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

  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiForbiddenResponse({ description: 'Password is incorrect' })
  @ApiCreatedResponse({ description: 'Logged user' })
  @ApiBadRequestResponse({ description: 'User cannot log in' })
  @Post('login')
  login(@Body() loginUserDto: LoginAuthDto) {
    return this.userService.login(loginUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({ description: 'Login token required' })
  @ApiFoundResponse({ description: 'Obtained user records' })
  @ApiNotFoundResponse({ description: 'User records not obtained' })
  @Get()
  async findAll(@Res() res: Response) {
    try {
      const user = await this.userService.findAll();
      res.status(HttpStatus.FOUND).json(user);
    } catch (error) {
      this.logger.error(error.code);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Contact Server Admin',
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({ description: 'Login token required' })
  @ApiNotFoundResponse({ description: 'User record not obtained' })
  @ApiOkResponse({ description: 'Obtained user record' })
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const user = await this.userService.findOne(id);
      res.status(HttpStatus.OK).json(user);
    } catch (error) {
      this.logger.error(error.code);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Contact Server Admin',
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({ description: 'Login token required' })
  @ApiCreatedResponse({ description: 'Updated record' })
  @ApiBadRequestResponse({ description: 'Could not update' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiOkResponse({ description: 'User Updated' })
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

  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({ description: 'Login token required' })
  @ApiOkResponse({ description: 'User deleted' })
  @ApiBadRequestResponse({ description: 'User has already been deleted' })
  @ApiNotFoundResponse({ description: 'User not found' })
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
