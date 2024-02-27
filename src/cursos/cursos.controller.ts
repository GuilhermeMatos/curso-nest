import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { CursosService } from './cursos.service';
import { CreateCursoDTO } from './dto/create-curso.dto';
import { UpdateCursoDTO } from './dto/update-curso.dto';

@Controller('cursos')
export class CursosController {
  constructor(private readonly cursosService: CursosService) {}

  @Get()
  async findAll(@Res() response) {
    const cursos = await this.cursosService.findAll();
    return response
      .status(HttpStatus.OK)
      .json({ count: cursos.length, content: cursos });
  }

  @Get(':id')
  async findById(@Param('id') id: string, @Res() response) {
    return response
      .status(HttpStatus.OK)
      .json({ content: await this.cursosService.findById(id) });
  }

  @Get('/tag/:nome')
  async findByTagName(@Param('nome') nome: string, @Res() response) {
    const tag = await this.cursosService.findByTagName(nome);

    return response
      .status(HttpStatus.OK)
      .json({ count: tag.cursos.length, content: tag });
  }

  @Post()
  async create(@Body() cursoDTO: CreateCursoDTO, @Res() response) {
    return response
      .status(HttpStatus.CREATED)
      .json({ content: await this.cursosService.create(cursoDTO) });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() cursoDTO: UpdateCursoDTO) {
    return `Atualizando o Curso ID: ${id}. Atualizando com os seguintes dados: 
            ${JSON.stringify(await this.cursosService.update(id, cursoDTO))}`;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.cursosService.delete(id);
  }
}
