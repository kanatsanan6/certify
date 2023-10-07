import { Injectable } from '@nestjs/common';
import signUpDto from './dto/sign-up.dto';
import { UsersService } from 'src/users/users.service';
import { CompaniesService } from 'src/companies/companies.service';
import { DataSource } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly companiesService: CompaniesService,
    private readonly usersService: UsersService,
  ) {}

  async signUp(payload: signUpDto): Promise<User> {
    const queryRunner = this.dataSource.createQueryRunner();
    const { companyName, ...rest } = payload;
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const company = await this.companiesService.create(
        { name: companyName },
        queryRunner,
      );

      const user = await this.usersService.create(
        { ...rest, company: company },
        queryRunner,
      );

      await queryRunner.commitTransaction();
      return user;
    } catch (err) {
      await queryRunner.rollbackTransaction();

      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
