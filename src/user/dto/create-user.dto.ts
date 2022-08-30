import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class createUserDto {
  @ApiProperty({
    description: 'Enter user email',
    example: 'user@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Enter user optional name',
    example: 'Eduardo',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Enter a user password',
    example: 'password123456',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
