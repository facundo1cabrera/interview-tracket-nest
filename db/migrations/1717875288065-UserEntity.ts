import { MigrationInterface, QueryRunner } from "typeorm";

export class UserEntity1717875288065 implements MigrationInterface {
    name = 'UserEntity1717875288065'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" text NOT NULL, "password" text NOT NULL, "fullname" text NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "roles" text array NOT NULL DEFAULT '{user}', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
