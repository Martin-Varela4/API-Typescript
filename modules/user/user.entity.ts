import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("usuarios")
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar" })
    nombre!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    passwordHash!: string;

    @CreateDateColumn()
    creadoEn!: Date;
}
