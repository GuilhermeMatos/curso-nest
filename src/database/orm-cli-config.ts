import { DataSource, DataSourceOptions } from 'typeorm';
import { CreateCursosTable1706281674252 } from 'src/migrations/1706281674252-CreateCursosTable';
import { CreateTagsTable1706281723008 } from 'src/migrations/1706281723008-CreateTagsTable';
import { CreateCursoTagsTable1706625192993 } from 'src/migrations/1706625192993-CreateCursoTagsTable';
import { AddCursoIdToCursoTagTable1706626083749 } from 'src/migrations/1706626083749-AddCursoIdToCursoTagTable';
import { AddTagIdToCursoTagTable1706626667136 } from 'src/migrations/1706626667136-AddTagIdToCursoTagTable';
import { Curso } from 'src/cursos/entities/cursos.entity';
import { Tag } from 'src/cursos/entities/tags.entity';
import 'dotenv/config';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Curso, Tag],
  synchronize: false,
};

export const dataSource = new DataSource({
  ...dataSourceOptions,
  synchronize: false,
  migrations: [
    CreateCursosTable1706281674252,
    CreateTagsTable1706281723008,
    CreateCursoTagsTable1706625192993,
    AddCursoIdToCursoTagTable1706626083749,
    AddTagIdToCursoTagTable1706626667136,
  ],
});
