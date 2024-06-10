import { MigrationInterface, QueryRunner } from "typeorm";

export class OneToManyRelationUserToProcessUserID1717962051905 implements MigrationInterface {
    name = 'OneToManyRelationUserToProcessUserID1717962051905'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "process" DROP CONSTRAINT "FK_69375d00ef5f4a91a156f5a7124"`);
        await queryRunner.query(`ALTER TABLE "process" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "process" ADD CONSTRAINT "FK_69375d00ef5f4a91a156f5a7124" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "process" DROP CONSTRAINT "FK_69375d00ef5f4a91a156f5a7124"`);
        await queryRunner.query(`ALTER TABLE "process" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "process" ADD CONSTRAINT "FK_69375d00ef5f4a91a156f5a7124" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
