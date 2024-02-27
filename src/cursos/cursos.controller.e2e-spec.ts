import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Curso } from './entities/cursos.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Tag } from './entities/tags.entity';
import { CursosModule } from './cursos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import request from 'supertest';

describe('CursosController (e2e)', () => {
  let app: INestApplication;
  let module: TestingModule;
  let data: any;
  let cursos: Curso[];

  const dataSourceOptionsTest: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5433,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [Curso, Tag],
    synchronize: true,
  };

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        CursosModule,
        TypeOrmModule.forRootAsync({
          useFactory: async () => {
            return dataSourceOptionsTest;
          },
        }),
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    data = {
      nome: 'Nome do Curso do Nest',
      descricao: 'Descrição do Curso Nest',
      tags: ['teste', 'automacao', 'e2e'],
    };
  });

  beforeEach(async () => {
    const dataSource = await new DataSource(dataSourceOptionsTest).initialize();
    const repository = dataSource.getRepository(Curso);
    cursos = await repository.find();
    await dataSource.destroy();
  });

  afterAll(async () => {
    await module.close();
  });

  describe('POST /cursos', () => {
    it('Criar Curso', async () => {
      const resposta = await request(app.getHttpServer())
        .post('/cursos')
        .send(data)
        .expect(HttpStatus.CREATED);

      const conteudo = resposta.body.content;

      expect(conteudo.id).toBeDefined();
      expect(conteudo.criadoEm).toBeDefined();
      expect(conteudo.nome).toEqual(data.nome);
      expect(conteudo.descricao).toEqual(data.descricao);
      expect(conteudo.tags.length).toEqual(3);
      expect(conteudo.tags[0].nome).toEqual(data.tags[0]);
      expect(conteudo.tags[1].nome).toEqual(data.tags[1]);
      expect(conteudo.tags[2].nome).toEqual(data.tags[2]);
    });
  });

  describe('GET /cursos', () => {
    it('Listar todos Cursos', async () => {
      const resposta = await request(app.getHttpServer())
        .get('/cursos')
        .expect(HttpStatus.OK);

      const conteudo = resposta.body.content;

      expect(resposta).toBeDefined();
      expect(cursos.length).toEqual(resposta.body.count);
      expect(cursos[0].id).toStrictEqual(conteudo[0].id);
      expect(cursos[0].nome).toStrictEqual(conteudo[0].nome);
      expect(cursos[0].descricao).toStrictEqual(conteudo[0].descricao);

      conteudo.map((item) =>
        expect(item).toEqual({
          id: item.id,
          nome: item.nome,
          descricao: item.descricao,
          tags: [...item.tags],
          criadoEm: item.criadoEm,
        }),
      );
    });
  });

  describe('GET /cursos/:id', () => {
    it('Buscar um Curso pelo ID', async () => {
      const resposta = await request(app.getHttpServer())
        .get(`/cursos/${cursos[0].id}`)
        .expect(HttpStatus.OK);

      const conteudo = resposta.body.content;

      expect(resposta).toBeDefined();
      expect(cursos[0].id).toStrictEqual(conteudo.id);
      expect(cursos[0].nome).toStrictEqual(conteudo.nome);
      expect(cursos[0].descricao).toStrictEqual(conteudo.descricao);
    });
  });

  describe('GET /cursos/tag/:nome', () => {
    it('Buscar um Curso pela Tag', async () => {
      const resposta = await request(app.getHttpServer())
        .get(`/cursos/tag/${data.tags[0]}`)
        .expect(HttpStatus.OK);

      const conteudo = resposta.body.content;

      expect(resposta).toBeDefined();
      expect(cursos.length).toEqual(resposta.body.count);
      expect(cursos[0].id).toStrictEqual(conteudo.cursos[0].id);
      expect(cursos[0].nome).toStrictEqual(conteudo.cursos[0].nome);
      expect(cursos[0].descricao).toStrictEqual(conteudo.cursos[0].descricao);
    });
  });
});
