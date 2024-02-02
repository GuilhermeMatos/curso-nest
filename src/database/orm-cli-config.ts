import { DataSource } from "typeorm";
import { dataSourceOptions } from "./database.module";
import { CreateCursosTable1706281674252 } from "src/migrations/1706281674252-CreateCursosTable";
import { CreateTagsTable1706281723008 } from "src/migrations/1706281723008-CreateTagsTable";
import { CreateCursoTagsTable1706625192993 } from "src/migrations/1706625192993-CreateCursoTagsTable";
import { AddCursoIdToCursoTagTable1706626083749 } from "src/migrations/1706626083749-AddCursoIdToCursoTagTable";
import { AddTagIdToCursoTagTable1706626667136 } from "src/migrations/1706626667136-AddTagIdToCursoTagTable";

export const dataSource = new DataSource({
    ...dataSourceOptions,
    synchronize: false,
    migrations: [
        CreateCursosTable1706281674252, 
        CreateTagsTable1706281723008, 
        CreateCursoTagsTable1706625192993,
        AddCursoIdToCursoTagTable1706626083749,
        AddTagIdToCursoTagTable1706626667136
    ]
});