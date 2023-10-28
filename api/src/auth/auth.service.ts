import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { CompaniesService } from 'src/companies/companies.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { DbTransactionFactory } from 'src/helper/transaction.factory';

@Injectable()
export class AuthService {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly transactionRunner: DbTransactionFactory,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email or Password is incorrect');
    }

    const matched = await bcrypt.compare(password, user.encryptedPassword);
    if (!matched) {
      throw new UnauthorizedException('Email or Password is incorrect');
    }

    const jwtPayload = { id: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(jwtPayload);

    return { accessToken };
  }

  async signUp(email: string, password: string, companyName: string) {
    let transactionRunner = null;
    let user: User;

    try {
      transactionRunner = await this.transactionRunner.createTransaction();
      await transactionRunner.startTransaction();
      const transactionManager = transactionRunner.transactionManager;

      const company = await this.companiesService.create(
        { companyName: companyName },
        transactionManager,
      );

      user = await this.usersService.create(
        { email, password, company },
        transactionManager,
      );

      await transactionRunner.commitTransaction();
      return user;
    } catch (error) {
      if (transactionRunner) await transactionRunner.rollbackTransaction();
      throw new UnprocessableEntityException(error.detail);
    } finally {
      if (transactionRunner) await transactionRunner.releaseTransaction();
    }
  }
}
