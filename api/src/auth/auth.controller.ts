import {
  Body,
  Controller,
  Post,
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
    return await this.authService.signIn(payload.email, payload.password);
  }

  @Post('/sign_up')
  async signUp(@Body() payload: signUpDto) {
    const { encryptedPassword: _, ...result } = await this.authService.signUp(
      payload.email,
      payload.password,
      payload.companyName,
    );
    return result;
  }
}
