import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Manufacturer{
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column({type: "string"})
    name: string;

    @Column({type: "string"})
    country: string;
}