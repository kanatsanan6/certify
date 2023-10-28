import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { Setting } from './entities/setting.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Setting)
    private readonly settingsRepository: Repository<Setting>,
  ) {}

  async create(
    { notifyBefore = 7 }: { notifyBefore?: number },
    transactionManager?: EntityManager,
  ) {
    if (transactionManager) {
      return await transactionManager.save(Setting, { notifyBefore });
    } else {
      await this.settingsRepository.save({ notifyBefore });
    }
  }
}
