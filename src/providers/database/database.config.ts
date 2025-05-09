import { registerAs } from '@nestjs/config';

export type DatabaseConfig = {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  sync: boolean;
  ssl: boolean;
};

export default registerAs('database', () => ({
  host: process.env.DATABASE_HOST!,
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  username: process.env.DATABASE_USERNAME!,
  password: process.env.DATABASE_PASSWORD!,
  database: process.env.DATABASE_NAME || 'tenants',
  sync: process.env.DATABASE_SYNC === 'true' || false,
  ssl: process.env.DATABASE_SSL === 'true' || false,
}));
