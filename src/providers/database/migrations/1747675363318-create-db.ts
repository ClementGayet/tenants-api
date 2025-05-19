import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDatabaseAndTable1747675363318 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "tenants"
      (
        "id"         SERIAL PRIMARY KEY,
        "licence"    VARCHAR(255) NOT NULL,
        "attributes" JSONB
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS "tenants";
      DROP DATABASE IF EXISTS "tenants";
    `);
  }
}
