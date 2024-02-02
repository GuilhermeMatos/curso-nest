import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddTagIdToCursoTagTable1706626667136 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('curso_tags_tag', new TableColumn({
            name: 'tagId',
            type: 'uuid',
            isNullable: true           
        }));

        await queryRunner.createForeignKey('curso_tags_tag', new TableForeignKey({
            name: 'curso_tag_tag',
            columnNames: ['tagId'],
            referencedTableName: 'tag',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('curso_tags_tag', 'curso_tag_tag');
        await queryRunner.dropColumn('curso_tags_tag', 'tagId');
    }

}
