import { IsString, IsEmail, IsOptional, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
