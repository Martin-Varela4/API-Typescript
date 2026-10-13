import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

// Los tipos se declaran de forma explícita porque `tsx` (esbuild) no emite
// metadatos de decoradores y TypeORM no podría inferirlos.
@Entity("usuarios")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100 })
  nombre!: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email!: string;

  // Hash bcrypt. Nunca debe salir en una respuesta HTTP (ver user.dto.ts)
  @Column({ type: "varchar", length: 255 })
  passwordHash!: string;

  @CreateDateColumn({ type: "datetime" })
  creadoEn!: Date;
}
