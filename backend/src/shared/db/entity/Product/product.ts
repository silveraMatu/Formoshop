import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import type {ValueTransformer} from "typeorm"

export enum StatusEnum {
  Agotado = 'Agotado',
  Disponible = 'Disponible',
}

// Transformer para que PostgreSQL devuelva 'decimal' como número flotante en JS
const numericTransformer: ValueTransformer = {
  to: (data: number) => data,
  from: (data: string) => parseFloat(data),
};

export interface IProductEntity {
  id: number;
  image?: string | null;
  title: string;
  price: number;
  category: number[];
  status: StatusEnum;
  description?: string | null;
  stock: number;
  tag?: string[] | null;
  ubicacion: string;
}

@Entity('products')
export class Product implements IProductEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', nullable: true, default: null })
  image?: string;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: numericTransformer,
  })
  price!: number;

  @Column({ type: 'int', array: true })
  category!: number[];

  @Column({
    type: 'enum',
    enum: StatusEnum,
    enumName: 'product_status_enum', // Nombre explícito para el tipo enum en Postgres
    default: StatusEnum.Disponible,
  })
  status!: StatusEnum;

  @Column({ type: 'int', default: 0 })
  stock!: number;

  @Column({ type: 'text', nullable: true, default: null })
  description?: string;

  @Column({ type: 'varchar', array: true, nullable: true, default: null })
  tag?: string[];

  @Column({ type: 'varchar', length: 255 })
  ubicacion!: string;
}
