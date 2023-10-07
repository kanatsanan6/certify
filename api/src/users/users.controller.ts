import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { JwtGuard } from 'src/auth/guards/jwt.guard';

@ApiBearerAuth('Authorization')
@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  @Get('me')
  async me(@Req() req) {
    return req.user;
  }
}
