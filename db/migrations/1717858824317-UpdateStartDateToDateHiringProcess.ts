import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateStartDateToDateHiringProcess1717858824317 implements MigrationInterface {
    name = 'UpdateStartDateToDateHiringProcess1717858824317'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "process" DROP COLUMN "startDate"`);
        await queryRunner.query(`ALTER TABLE "process" ADD "startDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "process" DROP COLUMN "finishDate"`);
        await queryRunner.query(`ALTER TABLE "process" ADD "finishDate" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "process" DROP COLUMN "finishDate"`);
        await queryRunner.query(`ALTER TABLE "process" ADD "finishDate" integer`);
        await queryRunner.query(`ALTER TABLE "process" DROP COLUMN "startDate"`);
        await queryRunner.query(`ALTER TABLE "process" ADD "startDate" integer NOT NULL`);
    }

}
