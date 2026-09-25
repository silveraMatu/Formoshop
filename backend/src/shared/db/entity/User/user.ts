import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from '../Product/product.ts';

interface IUserEntity {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  isPaippaVerified: boolean;
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

<<<<<<< HEAD
    @Column({ type: "boolean", default: false })
    isPaippaVerified!: boolean;

=======
  @OneToMany(() => Product, (product) => product.user)
  products!: Product[];
>>>>>>> dev-matu
}

