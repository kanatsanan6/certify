require('dotenv').config();

import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  migrations: ['src/database/migrations/*{.ts,.js}'],
  entities: ['src/**/entities/*.entity{.ts,.js}'],
});

export default dataSource;
