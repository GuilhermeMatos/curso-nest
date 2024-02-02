import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddCursoIdToCursoTagTable1706626083749 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('curso_tags_tag', new TableColumn({
            name: 'cursoId',
            type: 'uuid',
            isNullable: true           
        }));

        await queryRunner.createForeignKey('curso_tags_tag', new TableForeignKey({
            name: 'curso_tag_curso',
            columnNames: ['cursoId'],
            referencedTableName: 'curso',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('curso_tags_tag', 'curso_tag_curso');
        await queryRunner.dropColumn('curso_tags_tag', 'cursoId');
    }

}
