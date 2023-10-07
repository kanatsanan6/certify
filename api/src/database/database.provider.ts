import { DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const DataSourceConfiguration = (
  configService: ConfigService,
): PostgresConnectionOptions => {
  return {
    type: 'postgres',
    host: configService.get<string>('database.host'),
    port: configService.get<number>('database.port'),
    username: configService.get<string>('database.user'),
    password: configService.get<string>('database.pass'),
    database: configService.get<string>('database.name'),
    migrations: ['dist/database/migrations/*.js'],
    entities: ['dist/**/entities/*.entity.js'],
    synchronize: false,
  };
};

export const databaseProvider: DynamicModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: DataSourceConfiguration,
  inject: [ConfigService],
});
