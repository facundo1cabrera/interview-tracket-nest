import { MigrationInterface, QueryRunner } from "typeorm";

export class StepEntityDateIsNullable1718103026089 implements MigrationInterface {
    name = 'StepEntityDateIsNullable1718103026089'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "step" ALTER COLUMN "date" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "step" ALTER COLUMN "date" SET NOT NULL`);
    }

}
