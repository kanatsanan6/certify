import {
  Body,
  Controller,
  Get,
  NotFoundException,
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

@UseGuards(JwtGuard)
@Controller('domain')
export class DomainsController {
  constructor(private readonly domainsService: DomainsService) {}

  @Get()
  async findAll() {
    return await this.domainsService.findAll();
  }

  @Post()
  async create(@Body() payload: Omit<createDomainDto, 'user'>, @Req() req) {
    try {
      return await this.domainsService.create({
        ...payload,
        user: req.user,
      });
    } catch (err) {
      throw new UnprocessableEntityException(err.message);
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
