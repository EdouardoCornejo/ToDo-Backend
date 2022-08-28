import { IsString, IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateTodoDto {
  @IsString()
  title: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsBoolean()
  completed: boolean;
}
