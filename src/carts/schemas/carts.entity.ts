import { Order } from "src/orders/schemas/orders.entyty";
import { Teapot } from "src/teapots/schemas/teapots.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Cart {
    @Column()
    amount: number;

    @ManyToOne(() => Teapot, { primary: true, eager: true })
    teapot: Teapot;

    @ManyToOne(() => Order, (order) => order.carts, { primary: true })
    order: Order;
}