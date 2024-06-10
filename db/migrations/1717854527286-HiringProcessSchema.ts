import { MigrationInterface, QueryRunner } from "typeorm";

export class HiringProcessSchema1717854527286 implements MigrationInterface {
    name = 'HiringProcessSchema1717854527286'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "process" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "jobTitle" character varying NOT NULL, "companyName" character varying NOT NULL, "startDate" integer NOT NULL, "finishDate" integer, "status" character varying NOT NULL, "appliedBy" character varying, "jobDescription" character varying, "timeOff" character varying, "salaryRange" character varying, "jobSchema" character varying, "bonus" character varying, "techStack" character varying, "stockOptions" character varying, "location" character varying, "interviewsSteps" integer NOT NULL, CONSTRAINT "PK_d5e3ab0f6df55ee74ca24967952" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "process"`);
    }

}
