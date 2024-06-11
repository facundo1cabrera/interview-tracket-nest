import { MigrationInterface, QueryRunner } from "typeorm";

export class StepEntity1718056070697 implements MigrationInterface {
    name = 'StepEntity1718056070697'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "step" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "duration" character varying NOT NULL, "type" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "status" character varying NOT NULL, "processId" uuid NOT NULL, CONSTRAINT "PK_70d386ace569c3d265e05db0cc7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "process" DROP CONSTRAINT "FK_69375d00ef5f4a91a156f5a7124"`);
        await queryRunner.query(`ALTER TABLE "process" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "process" ADD CONSTRAINT "FK_69375d00ef5f4a91a156f5a7124" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "step" ADD CONSTRAINT "FK_2d2bec3356604b9e2fa3588d1e5" FOREIGN KEY ("processId") REFERENCES "process"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "step" DROP CONSTRAINT "FK_2d2bec3356604b9e2fa3588d1e5"`);
        await queryRunner.query(`ALTER TABLE "process" DROP CONSTRAINT "FK_69375d00ef5f4a91a156f5a7124"`);
        await queryRunner.query(`ALTER TABLE "process" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "process" ADD CONSTRAINT "FK_69375d00ef5f4a91a156f5a7124" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE "step"`);
    }

}
