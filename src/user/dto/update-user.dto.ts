import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNotEmpty()
  password: string;
}
