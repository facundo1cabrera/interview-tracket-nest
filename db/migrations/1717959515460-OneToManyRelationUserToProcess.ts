import { MigrationInterface, QueryRunner } from "typeorm";

export class OneToManyRelationUserToProcess1717959515460 implements MigrationInterface {
    name = 'OneToManyRelationUserToProcess1717959515460'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "process" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "process" ADD CONSTRAINT "FK_69375d00ef5f4a91a156f5a7124" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "process" DROP CONSTRAINT "FK_69375d00ef5f4a91a156f5a7124"`);
        await queryRunner.query(`ALTER TABLE "process" DROP COLUMN "userId"`);
    }

}
