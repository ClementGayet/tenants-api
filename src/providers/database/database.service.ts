import * as path from 'node:path';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { SnakeNamingStrategy } from './snake-naming-strategy';
import { DatabaseConfig } from './database.config';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    try {
      const { host, port, database, username, password, sync, ssl } =
        this.config.getOrThrow<DatabaseConfig>('database');

      return {
        type: 'postgres',

        // connection options
        host,
        port,
        username,
        password,
        database,

        ssl: ssl ? { rejectUnauthorized: false } : false,

        // migrations options
        migrationsRun: !sync,
        migrations: [
          path.join(__dirname, '/migrations/*.{ts,js}'),
          path.join(__dirname, '/seeds/*.{ts,js}'),
        ],

        // entity related options
        synchronize: sync,
        autoLoadEntities: true,

        namingStrategy: new SnakeNamingStrategy(),
      };
    } catch (error) {
      throw new Error(`Error creating TypeORM options`, {
        cause: error,
      });
    }
  }
}
