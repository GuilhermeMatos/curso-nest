import { IsString } from "class-validator";

export class CreateCursoDTO {
    @IsString()
    readonly nome: string;
    @IsString()
    readonly descricao: string;
    @IsString({each: true})
    readonly tags: string[];
}