import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { StatusName } from "./status-name.enum";

@Entity()
export class User{
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    email: string;

    @Column({select: false})
    password:string;

    @Column()
    birthDate:Date;

    @Column()
    status:StatusName;
}