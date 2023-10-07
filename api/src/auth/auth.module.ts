import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';

import appConfig from 'src/config/app.config';
import { AuthService } from './auth.service';
import { CompaniesModule } from '../companies/companies.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    CompaniesModule,
    UsersModule,
    JwtModule.registerAsync({
      useFactory: async (app: ConfigType<typeof appConfig>) => ({
        secret: app.jwtSecret,
        signOptions: {
          expiresIn: app.jwtExpiresIn,
        },
      }),
      inject: [appConfig.KEY],
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
