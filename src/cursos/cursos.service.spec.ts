import { randomUUID } from 'crypto';
import { CursosService } from './cursos.service';
import { CreateCursoDTO } from './dto/create-curso.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UpdateCursoDTO } from './dto/update-curso.dto';

describe('CursosService Testes Unitários', () => {
  let service: CursosService;
  let idTag: string;
  let idCurso: string;
  let criadoEm: Date;
  let retornoTags: any;
  let retornoCursos: any;
  let mockCursoRepository: any;
  let mockTagRepository: any;

  beforeEach(async () => {
    service = new CursosService();
    idTag = randomUUID();
    idCurso = randomUUID();
    criadoEm = new Date();

    retornoCursos = [
      {
        id: idCurso,
        nome: 'Nome do Curso 90 Estou testando',
        descricao: 'Descrição do Curso 3',
        criadoEm: criadoEm,
        tags: retornoTags,
      },
    ];

    retornoTags = [
      {
        id: idTag,
        nome: 'typescript',
        criadoEm: criadoEm,
        cursos: retornoCursos,
      },
    ];

    mockCursoRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(retornoCursos[0])),
      save: jest.fn().mockReturnValue(Promise.resolve(retornoCursos[0])),
      update: jest.fn().mockReturnValue(Promise.resolve(retornoCursos)),
      preload: jest.fn().mockReturnValue(Promise.resolve(retornoCursos)),
      findAll: jest.fn().mockReturnValue(Promise.resolve(retornoCursos)),
      find: jest.fn().mockReturnValue(Promise.resolve(retornoCursos)),
      findOne: jest.fn().mockReturnValue(Promise.resolve(retornoCursos[0])),
      remove: jest.fn().mockReturnValue(Promise.resolve(retornoCursos)),
    };

    mockTagRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(retornoTags[0])),
      findOne: jest.fn().mockReturnValue(Promise.resolve(retornoTags[0])),
    };
  });

  it('Criar Curso', async () => {
    //@ts-expect-error defined part of methods
    service['cursoRepository'] = mockCursoRepository;
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository;

    const createCursoDTO: CreateCursoDTO = {
      nome: 'Nome do Curso 90 Estou testando',
      descricao: 'Descrição do Curso 3',
      tags: ['typescript'],
    };

    const curso = await service.create(createCursoDTO);

    expect(mockCursoRepository.save).toHaveBeenCalled();
    expect(mockCursoRepository.create).toHaveBeenCalled();
    expect(mockTagRepository.findOne).toHaveBeenCalled();

    expect(retornoCursos[0]).toStrictEqual(curso);
  });

  it('Listar todos Cursos', async () => {
    //@ts-expect-error defined part of methods
    service['cursoRepository'] = mockCursoRepository;

    const curso = await service.findAll();

    expect(mockCursoRepository.find).toHaveBeenCalled();
    expect(retornoCursos).toStrictEqual(curso);
  });

  it('Buscar um Curso pelo id', async () => {
    //@ts-expect-error defined part of methods
    service['cursoRepository'] = mockCursoRepository;

    const curso = await service.findById(idCurso);

    expect(mockCursoRepository.findOne).toHaveBeenCalled();
    expect(idCurso).toStrictEqual(curso.id);
    expect(retornoCursos[0]).toStrictEqual(curso);
  });

  it('Buscar um Curso pela Tag', async () => {
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository;

    const tag = await service.findByTagName(retornoTags[0].nome);

    expect(mockTagRepository.findOne).toHaveBeenCalled();
    expect(idTag).toStrictEqual(tag.id);
    expect(retornoCursos.length).toStrictEqual(tag.cursos.length);
  });

  it('Buscar um Curso HttpException', async () => {
    mockCursoRepository['findOne'] = jest
      .fn()
      .mockReturnValue(Promise.resolve());

    //@ts-expect-error defined part of methods
    service['cursoRepository'] = mockCursoRepository;

    try {
      await service.findById(idCurso);
    } catch (t) {
      expect(t).toBeInstanceOf(HttpException);
      expect(HttpStatus.NOT_FOUND).toStrictEqual(t.status);
      expect(`O curso com ID: ${idCurso} não foi encontrado`).toStrictEqual(
        t.response,
      );
    }

    expect(mockCursoRepository.findOne).toHaveBeenCalled();
  });

  it('Atualizar Curso', async () => {
    mockTagRepository['findOne'] = jest.fn().mockReturnValue(Promise.resolve());

    //@ts-expect-error defined part of methods
    service['cursoRepository'] = mockCursoRepository;
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository;

    const updateCursoDTO: UpdateCursoDTO = {
      nome: 'Nome Alterado',
      tags: ['typescript'],
    };

    const curso = await service.update(idCurso, updateCursoDTO);

    expect(mockCursoRepository.save).toHaveBeenCalled();
    expect(mockCursoRepository.preload).toHaveBeenCalled();
    expect(mockTagRepository.findOne).toHaveBeenCalled();
    expect(mockTagRepository.create).toHaveBeenCalled();
    expect(retornoCursos).toStrictEqual(curso);
  });

  it('Atualizar Curso HttpException', async () => {
    mockCursoRepository['preload'] = jest
      .fn()
      .mockReturnValue(Promise.resolve());

    //@ts-expect-error defined part of methods
    service['cursoRepository'] = mockCursoRepository;
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository;

    try {
      const updateCursoDTO: UpdateCursoDTO = {
        nome: 'Nome Alterado',
        tags: ['typescript'],
      };

      await service.update(idCurso, updateCursoDTO);
    } catch (t) {
      expect(t).toBeInstanceOf(HttpException);
      expect(HttpStatus.NOT_FOUND).toStrictEqual(t.status);
      expect(`O curso com ID: ${idCurso} não foi encontrado`).toStrictEqual(
        t.response,
      );
    }

    expect(mockCursoRepository.preload).toHaveBeenCalled();
    expect(mockTagRepository.findOne).toHaveBeenCalled();
  });

  it('Deletar um Curso', async () => {
    //@ts-expect-error defined part of methods
    service['cursoRepository'] = mockCursoRepository;

    const curso = await service.delete(idCurso);

    expect(mockCursoRepository.findOne).toHaveBeenCalled();
    expect(mockCursoRepository.remove).toHaveBeenCalled();
    expect(retornoCursos).toStrictEqual(curso);
  });

  it('Deletar um Curso HttpException', async () => {
    mockCursoRepository['findOne'] = jest
      .fn()
      .mockReturnValue(Promise.resolve());

    //@ts-expect-error defined part of methods
    service['cursoRepository'] = mockCursoRepository;

    try {
      await service.delete(idCurso);
    } catch (t) {
      expect(t).toBeInstanceOf(HttpException);
      expect(HttpStatus.NOT_FOUND).toStrictEqual(t.status);
      expect(`O curso com ID: ${idCurso} não foi encontrado`).toStrictEqual(
        t.response,
      );
    }

    expect(mockCursoRepository.findOne).toHaveBeenCalled();
  });
});
