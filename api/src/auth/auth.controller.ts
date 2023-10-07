import {
  Body,
  Controller,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';

import signUpDto from './dto/sign-up.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
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
