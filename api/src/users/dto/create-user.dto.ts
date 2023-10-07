import { Company } from 'src/companies/entities/company.entity';

export default class CreateUserDto {
  email: string;
  password: string;
  company: Company;
}
