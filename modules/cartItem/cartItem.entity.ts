import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Cart } from '../cart/cart.entity.js';
import { Product } from '../products/products.entity.js';

@Entity()
export class CartItem {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'int', default: 1 })
    quantity!: number;

    @ManyToOne(() => Cart, (cart) => cart.items, { onDelete: 'CASCADE' })
    cart!: Cart;

    @ManyToOne(() => Product)
    product: Product;
}
