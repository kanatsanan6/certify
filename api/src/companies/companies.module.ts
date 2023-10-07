import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Company } from './entities/company.entity';
import { CompaniesService } from './companies.service';

@Module({
  providers: [CompaniesService],
  exports: [CompaniesService],
})
export class CompaniesModule {}
