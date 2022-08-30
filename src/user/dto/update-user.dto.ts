import { IsString, IsOptional, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateUserDto {
  @ApiProperty({
    description: 'Update user name',
    example: 'Eduardo',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Update a user password',
    example: 'password123456',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
