import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Domain } from './entities/domain.entity';
import { DomainsService } from './domains.service';
import { DomainsController } from './domains.controller';
import { HelperModule } from 'src/helper/helper.module';

@Module({
  imports: [TypeOrmModule.forFeature([Domain]), HelperModule],
  providers: [DomainsService],
  controllers: [DomainsController],
})
export class DomainsModule {}
