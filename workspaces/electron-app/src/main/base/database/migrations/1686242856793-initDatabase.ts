import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDatabase1686242856793 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // TODO: upgrade database
    await queryRunner.query(
      `CREATE TABLE "setting" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "key" varchar NOT NULL, "value" varchar NOT NULL, CONSTRAINT "UQ_26489c99ddbb4c91631ef5cc791" UNIQUE ("key"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // TODO: downgrade database
    await queryRunner.query(`DROP TABLE setting;`);
  }
}
