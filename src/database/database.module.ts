import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Curso } from 'src/cursos/entities/cursos.entity';
import { Tag } from 'src/cursos/entities/tags.entity';
import { DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'docker',
    database: 'curso-db',
    entities: [Curso, Tag],
    synchronize: false,
}

@Module({
    imports: [TypeOrmModule.forRootAsync({
            useFactory: async () => {
                return {
                    ...dataSourceOptions,
                }
            }
        })
    ],
})
export class DatabaseModule {}
