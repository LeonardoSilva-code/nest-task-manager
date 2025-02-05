import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1738688359625 implements MigrationInterface {
    name = 'Migration1738688359625'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "project_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "project_id" character varying NOT NULL`);
    }

}
