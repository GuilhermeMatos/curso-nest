import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Curso } from "./cursos.entity";
import { randomUUID } from "crypto";

@Entity('tag')
export class Tag {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nome: string;

    @CreateDateColumn({name:'criado_em', type: 'timestamp'})
    criadoEm: Date

    @ManyToMany(() => Curso, curso => curso.tags)
    cursos: Curso[];

    @BeforeInsert()
    gerarId() {
        if(this.id) {
            return 
        }

        this.id = randomUUID();
    }
}