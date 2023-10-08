import { Body, Controller, Get, Post, Req } from '@nestjs/common';

import { DomainsService } from './domains.service';
import createDomainDto from './dto/create-domain.dto';

@Controller('domain')
export class DomainsController {
  constructor(private readonly domainsService: DomainsService) {}

  @Get()
  async findAll() {
    return await this.domainsService.findAll();
  }

  @Post()
  async create(@Body() payload: Omit<createDomainDto, 'user'>, @Req() req) {
    return await this.domainsService.create({
      ...payload,
      user: req.user,
    });
  }
}
