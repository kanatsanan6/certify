import { Injectable } from '@nestjs/common';
import { Company } from './entities/company.entity';
import { QueryRunner, Repository } from 'typeorm';

import CreateCompanyDto from './dto/create-company.dto';

@Injectable()
export class CompaniesService {
  async create(
    company: CreateCompanyDto,
    queryRunner: QueryRunner,
  ): Promise<Company> {
    return await queryRunner.manager.save(Company, { ...company });
  }
}
