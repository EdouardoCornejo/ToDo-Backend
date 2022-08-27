import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { UpdateUserDto } from './update-user.dto';
export class CreateUserDto extends PartialType(UpdateUserDto) {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
