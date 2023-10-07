import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { ConfigType } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import CreateUserDto from './dto/create-user.dto';
import appConfig from 'src/config/app.config';

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

  async create(user: CreateUserDto, queryRunner: QueryRunner): Promise<User> {
    const { password, company, ...rest } = user;
    const hash = await bcrypt.hash(password, this.app.salt);

    return queryRunner.manager.save(User, {
      ...rest,
      encryptedPassword: hash,
      company: company,
    });
  }
}
