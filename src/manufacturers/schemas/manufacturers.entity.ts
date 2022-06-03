import { Teapot } from 'src/teapots/schemas/teapots.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Manufacturer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  country: string;

  @OneToMany(() => Teapot, (teapots) => teapots.manufacturer)
  teapots: Teapot[];
}
