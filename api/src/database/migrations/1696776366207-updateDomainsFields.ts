import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDomainsFields1696776366207 implements MigrationInterface {
    name = 'UpdateDomainsFields1696776366207'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "domain" ADD "errorMessage" text`);
        await queryRunner.query(`ALTER TYPE "public"."domain_status_enum" RENAME TO "domain_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."domain_status_enum" AS ENUM('valid', 'invalid')`);
        await queryRunner.query(`ALTER TABLE "domain" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "domain" ALTER COLUMN "status" TYPE "public"."domain_status_enum" USING "status"::"text"::"public"."domain_status_enum"`);
        await queryRunner.query(`ALTER TABLE "domain" ALTER COLUMN "status" SET DEFAULT 'invalid'`);
        await queryRunner.query(`DROP TYPE "public"."domain_status_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."domain_status_enum_old" AS ENUM('checked', 'unchecked', 'expired')`);
        await queryRunner.query(`ALTER TABLE "domain" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "domain" ALTER COLUMN "status" TYPE "public"."domain_status_enum_old" USING "status"::"text"::"public"."domain_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "domain" ALTER COLUMN "status" SET DEFAULT 'unchecked'`);
        await queryRunner.query(`DROP TYPE "public"."domain_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."domain_status_enum_old" RENAME TO "domain_status_enum"`);
        await queryRunner.query(`ALTER TABLE "domain" DROP COLUMN "errorMessage"`);
    }

}
