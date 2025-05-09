import { Module } from '@nestjs/common';
import { TenantsModule } from './api/tenants/tenants.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './providers/database/database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './providers/database/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseService,
    }),
    TenantsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
