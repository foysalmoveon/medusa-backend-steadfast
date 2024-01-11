import {MigrationInterface, QueryRunner} from "typeorm";

export class SteadFast1627982729038 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {

        // Update this method to create the SteadFast table
        await queryRunner.query(`
            CREATE TABLE "stead_fast" (
                "id" character varying NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "store_id" character varying NOT NULL UNIQUE,
                "api_key" character varying NOT NULL,
                "secrecy_key" character varying NOT NULL,
                CONSTRAINT "PK_steadfast" PRIMARY KEY ("id"),
                CONSTRAINT "FK_stead_fast_connect_with_store" FOREIGN KEY ("store_id") REFERENCES "store" ("id") ON DELETE CASCADE
            )
        `);

        await queryRunner.query(`
            CREATE INDEX "IDX_stead_fast_connect_with_store" ON "stead_fast" ("store_id")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Update this method to drop the SteadFast table if needed
        await queryRunner.query(`DROP TABLE "stead_fast"`);
    }
}
