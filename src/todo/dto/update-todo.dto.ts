import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { IsBoolean, IsString } from 'class-validator';

/* It extends the CreateTodoDto class and adds the @IsString() and @IsBoolean() decorators to the title
and completed properties */
export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @IsString()
  title: string;

  @IsString()
  date: string;

  @IsBoolean()
  completed: boolean;
}
