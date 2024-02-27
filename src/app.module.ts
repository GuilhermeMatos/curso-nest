import { Module } from '@nestjs/common';
import { CursosModule } from './cursos/cursos.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CursosModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
