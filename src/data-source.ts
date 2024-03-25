import { DataSource } from 'typeorm';
import { config } from 'dotenv';
config();
export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/**/*.entity{.js, .ts}'],
  migrations: ['dist/migration/*{.js,.ts}'],
});