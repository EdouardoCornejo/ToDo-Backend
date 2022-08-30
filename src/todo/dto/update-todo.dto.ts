import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';
import { CreateTodoDto } from './create-todo.dto';

/* It extends the CreateTodoDto class and adds the @ApiProperty decorator to each property */
export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @ApiProperty({
    description: 'Update the title of a task',
    example: 'Create a documentation',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Update the date of a task',
    example: '2022-08-29',
  })
  @IsString()
  date: string;

  @ApiProperty({
    description: 'Update the status of a task',
    example: 'true',
  })
  @IsBoolean()
  completed: boolean;
}
