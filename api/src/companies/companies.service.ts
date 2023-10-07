import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import CreateCompanyDto from './dto/create-company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companiesRepository: Repository<Company>,
  ) {}

  async create(company: CreateCompanyDto): Promise<Company> {
    const newCompany = this.companiesRepository.create(company);
    return this.companiesRepository.save(newCompany);
  }
}
