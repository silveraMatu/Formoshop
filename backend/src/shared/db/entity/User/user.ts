import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
