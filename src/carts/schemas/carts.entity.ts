import { Order } from "src/orders/schemas/orders.entyty";
import { Teapot } from "src/teapots/schemas/teapots.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Cart {
    @Column()
    amount: number;

    @ManyToOne(() => Teapot, (teapot) => teapot.carts, {primary: true})
    teapot: Teapot;

    @ManyToOne(() => Order, (order) => order.carts, {primary: true})
    order: Order;
}