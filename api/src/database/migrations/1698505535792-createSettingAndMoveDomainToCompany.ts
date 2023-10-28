import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSettingAndMoveDomainToCompany1698505535792 implements MigrationInterface {
    name = 'CreateSettingAndMoveDomainToCompany1698505535792'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "domain" DROP CONSTRAINT "FK_dde349027ada546b854e9fdb5fc"`);
        await queryRunner.query(`ALTER TABLE "domain" RENAME COLUMN "userId" TO "companyId"`);
        await queryRunner.query(`CREATE TABLE "setting" ("id" SERIAL NOT NULL, "notifyBefore" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_fcb21187dc6094e24a48f677bed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "domain" ADD CONSTRAINT "FK_930c863c655f537b6c25295d1e7" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "domain" DROP CONSTRAINT "FK_930c863c655f537b6c25295d1e7"`);
        await queryRunner.query(`DROP TABLE "setting"`);
        await queryRunner.query(`ALTER TABLE "domain" RENAME COLUMN "companyId" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "domain" ADD CONSTRAINT "FK_dde349027ada546b854e9fdb5fc" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
