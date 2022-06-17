import { Cart } from 'src/carts/schemas/carts.entity';
import { Delivery } from 'src/deliveries/schemas/deliveries.entity';
import { User } from 'src/auth/schemas/users.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StatusName } from './status-name.enum';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  orderDate: Date;

  @Column({ type: 'float4', default: 0 })
  orderSum: number;

  @Column({ type: 'enum', enum: StatusName, default: StatusName.RECIVED })
  status: StatusName;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ManyToOne(() => Delivery, (delivery) => delivery.orders)
  delivery: Delivery;

  @OneToMany(() => Cart, (carts) => carts.order, { eager: true })
  @JoinTable()
  carts: Cart[];
}
