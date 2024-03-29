import { Order } from 'src/orders/schemas/orders.entyty';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { UserStatus } from './user-status.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  mobPhone: string;

  @Column()
  surname: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true, select: false })
  password: string;

  @Column({ nullable: true })
  googleId: string;

  @Column({ nullable: true, type: 'date' })
  birthDate: Date;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.CLIENT })
  status: UserStatus;

  @OneToMany(() => Order, (orders) => orders.user)
  @JoinColumn()
  orders: Order[];
}
