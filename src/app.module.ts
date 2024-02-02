import { Module } from '@nestjs/common';
import { CursosModule } from './cursos/cursos.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [CursosModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
