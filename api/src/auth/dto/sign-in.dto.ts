import { IsEmail, IsNotEmpty } from 'class-validator';

export default class {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
