import { PartialType } from "@nestjs/mapped-types";
import { CreateCursoDTO } from "./create-curso.dto";

export class UpdateCursoDTO extends PartialType(CreateCursoDTO) {    
}