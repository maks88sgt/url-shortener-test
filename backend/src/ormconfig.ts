import { DataSource } from 'typeorm';
import { ShortUrl } from './entities/ShortUrl.js';
import { Click } from './entities/Click.js';
import dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT || 5432),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true, // на проде отключи
  logging: false,
  entities: [ShortUrl, Click],
});
