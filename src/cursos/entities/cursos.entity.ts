import { BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tag } from "./tags.entity";
import { randomUUID } from "crypto";

@Entity('curso')
export class Curso {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nome: string;
    
    @Column()
    descricao: string;

    @CreateDateColumn({name:'criado_em', type: 'timestamp'})
    criadoEm: Date
    
    @JoinTable()
    @ManyToMany(() => Tag, tag => tag.cursos, {
        cascade: true
    })
    tags: Tag[];

    @BeforeInsert()
    gerarId() {
        if(this.id) {
            return 
        }

        this.id = randomUUID();
    }
}
