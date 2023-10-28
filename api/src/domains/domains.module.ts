import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Domain } from './entities/domain.entity';
import { DomainsService } from './domains.service';
import { DomainsController } from './domains.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [TypeOrmModule.forFeature([Domain]), DatabaseModule],
  providers: [DomainsService],
  controllers: [DomainsController],
})
export class DomainsModule {}
