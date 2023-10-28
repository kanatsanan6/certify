import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { ConfigType } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import appConfig from 'src/config/app.config';
import { Company } from 'src/companies/entities/company.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(appConfig.KEY)
    private readonly app: ConfigType<typeof appConfig>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email: email });
  }

  async create(
    {
      email,
      password,
      company,
    }: {
      email: string;
      password: string;
      company: Company;
    },
    transactionManager?: EntityManager,
  ): Promise<User> {
    const hash = await bcrypt.hash(password, this.app.salt);

    if (transactionManager) {
      return transactionManager.save(User, {
        email,
        encryptedPassword: hash,
        company,
      });
    } else {
      this.usersRepository.save({ email, encryptedPassword: hash, company });
    }
  }
}
