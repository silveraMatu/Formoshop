import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { nullable } from 'zod';
import { tr } from 'zod/locales';

enum categoryEnum {"Agotado",  "Disponible"}

interface IProductEntity {
  id: number;
  image?: string
  title: string;
  price: number
  category: number[]
  status: categoryEnum
  description?: string | undefined
  stock: number
  tag?: string[]
  ubicacion: string
}


@Entity()
export class Product implements IProductEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: "varchar", nullable:true, default:null})
  image?: string;

  @Column({ type: "varchar" })
  title!: string;

  @Column({type: "decimal"})
  price!: number

  @Column({type: 'array'})
  category!: number[]

  @Column({type: "enum"})
  status!: categoryEnum

  @Column({type: "enum"})
  stock!: categoryEnum

  @Column({type: "string", nullable:true, default:null})
  description?: string

  @Column({type: "array", nullable:true, default:null})
  tag?: string[]

  @Column({type: "string"})
  ubicacion!: string
}
