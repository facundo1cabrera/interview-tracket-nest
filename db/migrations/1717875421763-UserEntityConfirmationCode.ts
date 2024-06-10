import { MigrationInterface, QueryRunner } from "typeorm";

export class UserEntityConfirmationCode1717875421763 implements MigrationInterface {
    name = 'UserEntityConfirmationCode1717875421763'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "isEmailConfirmed" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" ADD "confirmationCode" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "confirmationCode"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isEmailConfirmed"`);
    }

}
