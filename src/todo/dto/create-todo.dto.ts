import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/* It's a DTO class that defines the properties of a todo item */
export class CreateTodoDto {
  @ApiProperty({
    description: 'Enter the title of a task',
    example: 'Create a documentation',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Enter the date of a task',
    example: '2022-08-29',
  })
  @IsString()
  date: string;
}
