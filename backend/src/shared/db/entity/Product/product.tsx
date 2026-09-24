import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

enum categoryEnum {"Agotado",  "Disponible"}

interface IProductEntity {
  id: number;
  image: string
  title: string;
  price: number
  category: number[]
  status: categoryEnum
  stock: number
  tag: string[]
  ubicacion: string
}


@Entity()
export class Product implements IProductEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: "varchar"})
  image!: string;

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

  @Column({type: "array"})
  tag!: string[]

  @Column({type: "string"})
  ubicacion!: string
}
