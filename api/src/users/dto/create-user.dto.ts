import { Company } from 'src/companies/entities/company.entity';

export default class CreateUserDto {
  email: string;
  encryptedPassword: string;
  company: Company;
}
