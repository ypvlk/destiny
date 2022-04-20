import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1648392005264 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Promise.all([
    //   await queryRunner.query(`CREATE TABLE "users" (
    //     "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    //     "email" character varying(255) NOT NULL,
    //     "password" character varying(255) NOT NULL,
    //     CONSTRAINT "users_id_pk" PRIMARY KEY ("id"))`),
    //   await queryRunner.query(`CREATE TABLE "test" (
    //     "user_id" uuid NOT NULL,
    //     "options" character varying(255) NOT NULL,
    //     CONSTRAINT "test_user_id_fk" FOREIGN KEY (user_id)
    //     REFERENCES users(id) ON DELETE CASCADE NOT DEFERRABLE)`),
    // ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Promise.all([await queryRunner.query('DROP TABLE test'), await queryRunner.query('DROP TABLE users')]);
  }
}
