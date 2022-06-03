import { Order } from 'src/orders/schemas/orders.entyty';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Delivery {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  postNumber: number;

  @Column()
  adress: string;

  @Column()
  cityName: string;

  @OneToMany(() => Order, (orders) => orders.delivery)
  orders: Order[];
}
