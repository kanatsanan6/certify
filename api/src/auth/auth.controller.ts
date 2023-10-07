import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';

import signInDto from './dto/sign-in.dto';
import signUpDto from './dto/sign-up.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign_in')
  async signIn(@Body() payload: signInDto) {
    try {
      return await this.authService.signIn(payload);
    } catch (err) {
      throw new UnauthorizedException(err.detail);
    }
  }

  @Post('/sign_up')
  async signUp(@Body() payload: signUpDto) {
    try {
      const { encryptedPassword: _, ...result } =
        await this.authService.signUp(payload);
      return result;
    } catch (err) {
      throw new UnprocessableEntityException(err.detail);
    }
  }
}
