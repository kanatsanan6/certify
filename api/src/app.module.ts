import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import { DataSourceConfiguration } from './database/database.provider';
import { CompaniesModule } from './companies/companies.module';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { DomainsModule } from './domains/domains.module';
import { HelperModule } from './helper/helper.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: DataSourceConfiguration,
      inject: [databaseConfig.KEY],
    }),
    HelperModule,
    CompaniesModule,
    UsersModule,
    AuthModule,
    JwtModule,
    DomainsModule,
  ],
  providers: [AuthService],
})
export class AppModule {}
