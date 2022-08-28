import { IsString, IsOptional, IsNotEmpty, MinLength } from 'class-validator';
export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
