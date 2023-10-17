import { Injectable } from '@nestjs/common';
import { Company } from './entities/company.entity';
import { QueryRunner, Repository } from 'typeorm';

import CreateCompanyDto from './dto/create-company.dto';
import { dbTransactionWrap } from 'src/helper/database.helper';

@Injectable()
export class CompaniesService {
  async create(
    payload: CreateCompanyDto,
    queryRunner?: QueryRunner,
  ): Promise<Company> {
    let company: Company;
    await dbTransactionWrap(
      async (queryRunner: QueryRunner) => {
        company = await queryRunner.manager.save(Company, { ...payload });
      },
      { queryRunner },
    );

    return company;
  }
}
