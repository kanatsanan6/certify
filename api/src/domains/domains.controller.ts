import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';

import { DomainsService } from './domains.service';
import createDomainDto from './dto/create-domain.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { DbTransactionFactory } from 'src/database/transaction.factory';

@UseGuards(JwtGuard)
@Controller('domain')
export class DomainsController {
  constructor(
    private readonly domainsService: DomainsService,
    private readonly transactionRunner: DbTransactionFactory,
  ) {}

  @Get()
  async findAll() {
    return await this.domainsService.findAll();
  }

  @Post()
  async create(@Body() payload: Omit<createDomainDto, 'user'>, @Req() req) {
    let transactionRunner = null;

    try {
      transactionRunner = await this.transactionRunner.createTransaction();
      await transactionRunner.startTransaction();
      const transactionManager = transactionRunner.transactionManager;
      const domain = await this.domainsService.create(
        {
          ...payload,
          user: req.user,
        },
        transactionManager,
      );
      await this.domainsService.updateCert({ domain }, transactionManager);
      await transactionRunner.commitTransaction();
      return domain;
    } catch (err) {
      if (transactionRunner) await transactionRunner.rollbackTransaction();
      throw new UnprocessableEntityException(err.message);
    } finally {
      if (transactionRunner) await transactionRunner.releaseTransaction();
    }
  }

  @Put('/check/:id')
  async checkCert(@Param('id') id: number) {
    try {
      return this.domainsService.checkCert(id);
    } catch (err) {
      throw new UnprocessableEntityException(err.message);
    }
  }
}
