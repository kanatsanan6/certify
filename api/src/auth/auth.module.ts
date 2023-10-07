import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { CompaniesModule } from '../companies/companies.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [CompaniesModule, UsersModule],
  providers: [AuthService],
})
export class AuthModule {}
