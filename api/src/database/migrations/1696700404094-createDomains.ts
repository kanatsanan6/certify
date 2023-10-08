import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDomains1696700404094 implements MigrationInterface {
  name = 'CreateDomains1696700404094';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."domain_status_enum" AS ENUM('checked', 'unchecked', 'expired')`,
    );
    await queryRunner.query(
      `CREATE TABLE "domain" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "status" "public"."domain_status_enum" NOT NULL DEFAULT 'unchecked', "lastCheckedAt" TIMESTAMP, "expiresAt" TIMESTAMP, "issurer" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "userId" integer, CONSTRAINT "PK_27e3ec3ea0ae02c8c5bceab3ba9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain" ADD CONSTRAINT "FK_dde349027ada546b854e9fdb5fc" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "domain" DROP CONSTRAINT "FK_dde349027ada546b854e9fdb5fc"`,
    );
    await queryRunner.query(`DROP TABLE "domain"`);
    await queryRunner.query(`DROP TYPE "public"."domain_status_enum"`);
  }
}
