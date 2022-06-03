import { Cart } from 'src/carts/schemas/carts.entity';
import { Delivery } from 'src/deliveries/schemas/deliveries.entity';
import { User } from 'src/auth/schemas/users.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StatusName } from './status-name.enum';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  orderDate: Date;

  @Column()
  orderSum: number;

  @Column()
  status: StatusName;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ManyToOne(() => Delivery, (delivery) => delivery.orders)
  delivery: Delivery;

  @OneToMany(() => Cart, (carts) => carts.order)
  carts: Cart[];
}
