import { IsBoolean, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export default class {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsBoolean()
  @IsOptional()
  rememberMe?: boolean;
}
