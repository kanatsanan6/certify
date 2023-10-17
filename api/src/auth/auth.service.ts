import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import signInDto from './dto/sign-in.dto';
import signUpDto from './dto/sign-up.dto';
import { CompaniesService } from 'src/companies/companies.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { dbTransactionWrap } from 'src/helper/database.helper';

@Injectable()
export class AuthService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly companiesService: CompaniesService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(payload: signInDto): Promise<{ accessToken: string }> {
    const { email, password } = payload;
    const { encryptedPassword, ...result } =
      await this.usersService.findOneByEmail(email);
    const matched = await bcrypt.compare(password, encryptedPassword);

    if (!matched) {
      throw new UnauthorizedException();
    }

    const jwtPayload = { id: result.id, email: result.email };
    const accessToken = await this.jwtService.signAsync(jwtPayload);

    return { accessToken };
  }

  async signUp(payload: signUpDto): Promise<User> {
    const { companyName, ...rest } = payload;
    let user: User;
    await dbTransactionWrap(
      async (queryRunner: QueryRunner) => {
        const company = await this.companiesService.create(
          { name: companyName },
          queryRunner,
        );

        user = await this.usersService.create(
          { ...rest, company: company },
          queryRunner,
        );
      },
      {
        dataSource: this.dataSource,
      },
    );

    return user;
  }
}
