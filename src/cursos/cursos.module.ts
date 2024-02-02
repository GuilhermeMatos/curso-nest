import { Module } from '@nestjs/common';
import { CursosController } from './cursos.controller';
import { CursosService } from './cursos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Curso } from './entities/cursos.entity';
import { Tag } from './entities/tags.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Curso, Tag])],
  controllers: [CursosController],
  providers: [CursosService]
})
export class CursosModule {}
