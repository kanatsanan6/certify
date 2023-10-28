import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { Company } from './entities/company.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companiesRepository: Repository<Company>,
  ) {}

  async create(
    { companyName }: { companyName: string },
    transactionManager?: EntityManager,
  ): Promise<Company> {
    if (transactionManager) {
      return await transactionManager.save(Company, {
        name: companyName,
      });
    } else {
      await this.companiesRepository.save({ name: companyName });
    }
  }
}
