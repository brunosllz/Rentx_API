import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCars1656473902783 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "cars",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "description",
                        type: "varchar",
                    },
                    {
                        name: "daily_rate",
                        type: "numeric"
                    },
                    {
                        name: "available",
                        type: "boolean",
                        default: true
                    },
                    {
                        name: "license_plate",
                        type: "varchar",
                    },
                    {
                        name: "fine_amount",
                        type: "numeric",
                    },
                    {
                        name: "brand",
                        type: "varchar",
                    },
                    {
                        name: "category_id",
                        type: "uuid"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "FK_category_car",
                        referencedTableName: "categories",
                        referencedColumnNames: ["id"],
                        columnNames: ["category_id"],

                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
