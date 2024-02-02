import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Curso } from './entities/cursos.entity';
import { Repository } from 'typeorm';
import { Tag } from './entities/tags.entity';
import { CreateCursoDTO } from './dto/create-curso.dto';
import { UpdateCursoDTO } from './dto/update-curso.dto';

@Injectable()
export class CursosService {
  @InjectRepository(Curso)
  private readonly cursoRepository: Repository<Curso>;

  @InjectRepository(Tag)
  private readonly tagRepository: Repository<Tag>;

  async findAll() {
    return await this.cursoRepository.find({ relations: ['tags'] });
  }

  async findByTagName(nome: string) {
    const tags = await this.tagRepository.findOne({
      where: { nome },
      relations: ['cursos'],
    });

    if (!tags) {
      throw new HttpException(
        `A Tag: ${nome} não foi encontrada`,
        HttpStatus.NOT_FOUND,
      );
    }

    return tags;
  }

  async findById(id: string) {
    const curso = await this.cursoRepository.findOne({
      where: { id },
      relations: ['tags'],
    });

    if (!curso) {
      throw new HttpException(
        `O curso com ID: ${id} não foi encontrado`,
        HttpStatus.NOT_FOUND,
      );
    }

    return curso;
  }

  async create(cursoDTO: CreateCursoDTO) {
    const tags = await Promise.all(
      cursoDTO.tags.map((nome) => this.preLoadTagByName(nome)),
    );
    const curso = this.cursoRepository.create({
      ...cursoDTO,
      tags,
    });
    return await this.cursoRepository.save(curso);
  }

  async update(id: string, cursoDTO: UpdateCursoDTO) {
    const tags =
      cursoDTO.tags &&
      (await Promise.all(
        cursoDTO.tags.map((nome) => this.preLoadTagByName(nome)),
      ));
    const curso = await this.cursoRepository.preload({
      ...cursoDTO,
      id,
      tags,
    });

    if (!curso) {
      throw new HttpException(
        `O curso com ID: ${id} não foi encontrado`,
        HttpStatus.NOT_FOUND,
      );
    } else {
      this.cursoRepository.save(curso);
    }

    return curso;
  }

  async delete(id: string) {
    const curso = await this.cursoRepository.findOne({
      where: { id },
    });

    if (!curso) {
      throw new HttpException(
        `O curso com ID: ${id} não foi encontrado`,
        HttpStatus.NOT_FOUND,
      );
    } else {
      return this.cursoRepository.remove(curso);
    }
  }

  private async preLoadTagByName(nome: string): Promise<Tag> {
    const tag = await this.tagRepository.findOne({ where: { nome } });
    if (tag) {
      return tag;
    } else {
      return this.tagRepository.create({ nome });
    }
  }
}
