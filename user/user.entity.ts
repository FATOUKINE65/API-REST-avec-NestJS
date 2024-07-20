import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    nom:string;

    @Column()
    prenom:string;

    @Column()
    Tel:number;

    @Column()
    date:string;

    @Column()
    email:string;
    
    @Column()
    password:string;
}
