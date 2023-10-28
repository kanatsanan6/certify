import { Module } from '@nestjs/common';
import { DbTransactionFactory } from './transaction.factory';

@Module({
  providers: [DbTransactionFactory],
  exports: [DbTransactionFactory],
})
export class DatabaseModule {}
