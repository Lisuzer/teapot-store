import { Order } from 'src/orders/schemas/orders.entyty';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserStatus } from './user-status.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({unique: true})
  mobPhone: string;

  @Column()
  surname: string;

  @Column({unique: true})
  email: string;

  @Column({ select: false })
  password: string;

  @Column({nullable: true})
  birthDate: Date;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.CLIENT })
  status: UserStatus;

  @OneToMany(() => Order, (orders) => orders.user)
  orders: Order[];
}
