import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from '../Product/product.ts';

interface IUserEntity {
  id: number;
  name: string;
  email: string;
  password_hash: string;
}

@Entity()
export class User implements IUserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: "varchar"})
  name!: string;

  @Column({ type: "varchar", unique: true })
  email!: string;

  @Column({type: "varchar"})
  password_hash!: string;

  @OneToMany(() => Product, (product) => product.user)
  products!: Product[];
}
