import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompaniesService } from './companies.service';
import { Company } from './entities/company.entity';
import { SettingsService } from './settings.service';
import { Setting } from './entities/setting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company, Setting])],
  providers: [CompaniesService, SettingsService],
  exports: [CompaniesService, SettingsService],
})
export class CompaniesModule {}
