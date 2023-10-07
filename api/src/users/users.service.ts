import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import CreateUserDto from './dto/create-user.dto';
import { ConfigType } from '@nestjs/config';
import appConfig from 'src/config/app.config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private app: ConfigType<typeof appConfig>,
  ) {}

  async findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email: email });
  }

  async create(user: CreateUserDto): Promise<User> {
    const { password, ...rest } = user;
    const hash = await bcrypt.hash(password, this.app.salt);

    const newUser = this.usersRepository.create({
      ...rest,
      encryptedPassword: hash,
    });
    return this.usersRepository.save(newUser);
  }
}
