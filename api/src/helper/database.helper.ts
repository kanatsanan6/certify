import { DataSource, QueryRunner } from 'typeorm';

export const dbTransactionWrap = async (
  operation: (...args) => any,
  {
    queryRunner,
    dataSource,
  }: {
    queryRunner?: QueryRunner;
    dataSource?: DataSource;
  },
) => {
  if (queryRunner) {
    await operation(queryRunner);
  } else if (dataSource) {
    const queryRunner = dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      await operation(queryRunner);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();

      throw err;
    } finally {
      await queryRunner.release();
    }
  } else {
    operation();
  }
};
