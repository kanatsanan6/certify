import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export default class {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(64)
  password: string;

  @IsNotEmpty()
  passwordConfirmation: string;

  @IsNotEmpty()
  companyName: string;
}
