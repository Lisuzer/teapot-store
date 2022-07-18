import { Cart } from 'src/carts/schemas/carts.entity';
import { Manufacturer } from 'src/manufacturers/schemas/manufacturers.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Teapot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  year: number;

  @Column({ type: 'float4' })
  weight: number;

  @Column()
  material: string;

  @Column({ type: 'float4' })
  capacity: number;

  @Column()
  features: string;

  @Column()
  amount: number;

  @Column({ type: 'float4' })
  price: number;

  @Column()
  img: string;

  @ManyToOne(() => Manufacturer, (manufacturer) => manufacturer.teapots, {
    onDelete: 'CASCADE',
  })
  manufacturer: Manufacturer;

  @OneToMany(()=>Cart, (carts)=> carts.teapot)
  carts: Cart[];
}
