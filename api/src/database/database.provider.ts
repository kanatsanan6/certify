import { ConfigType } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import databaseConfig from 'src/config/database.config';

export const DataSourceConfiguration = (
  dbConfig: ConfigType<typeof databaseConfig>,
): PostgresConnectionOptions => {
  return {
    type: 'postgres',
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.user,
    password: dbConfig.pass,
    database: dbConfig.name,
    migrations: ['dist/database/migrations/*.js'],
    entities: ['dist/**/entities/*.entity.js'],
    logging: ['query', 'error'],
    synchronize: false,
  };
};
