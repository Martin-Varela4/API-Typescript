import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";
import { User } from "../user/user.entity.js";
import { CartItem } from "../cartItem/cartItem.entity.js";
import { OneToMany, OneToOne, JoinColumn } from "typeorm";

@Entity("cart")
export class Cart {
    @PrimaryGeneratedColumn()
    id!: number;

    @OneToOne(() => User)
    @JoinColumn()
    user!: User;

    @OneToMany(() => CartItem, (cartItem) => cartItem.cart, { cascade: true })
    items!: CartItem[];
}
