import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

enum statusEnum {"Agotado" = "Agotado", "Disponible" = "Disponible"}

interface IProductEntity {
  id: number;
  image?: string
  title: string;
  price: number
  category: number[]
  status: statusEnum
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

  @Column({type: 'int', array: true})
  category!: number[]

  @Column({type: "enum"})
  status!: statusEnum

  @Column({type: "number"})
  stock!: number

  @Column({type: "varchar", nullable:true, default:null})
  description?: string

  @Column({type: "varchar", array:true, nullable:true, default:null})
  tag?: string[]

  @Column({type: "varchar"})
  ubicacion!: string
}
