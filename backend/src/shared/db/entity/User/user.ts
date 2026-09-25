import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from '../Product/product.ts';

export enum UserRole {
  CLIENT = 'CLIENT',
  PRODUCER = 'PRODUCER',
  ADMIN = 'ADMIN',
}

interface IUserEntity {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: UserRole;
}

@Entity()
export class User implements IUserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: "varchar"})
  name!: string;

  @Column({ type: "varchar", unique: true })
  email!: string;

  @Column({ type: "varchar"})
  password_hash!: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    enumName: 'user_role_enum',
    default: UserRole.CLIENT,
  })
  role!: UserRole;

  @OneToMany(() => Product, (product) => product.user)
  products!: Product[];
}

