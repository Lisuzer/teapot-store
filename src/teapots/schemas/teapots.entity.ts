import { Cart } from 'src/carts/schemas/carts.entity';
import { Manufacturer } from 'src/manufacturers/schemas/manufacturers.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Teapot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  year: number;

  @Column()
  weight: number;

  @Column()
  material: string;

  @Column()
  capacity: number;

  @Column()
  features: string;

  @Column()
  amount: number;

  @Column()
  price: number;

  @Column()
  img: string;

  @ManyToOne(() => Manufacturer, (manufacturer) => manufacturer.teapots)
  manufacturer: Manufacturer;

  @OneToMany(() => Cart, (carts) => carts.teapot)
  carts: Cart[];
}
