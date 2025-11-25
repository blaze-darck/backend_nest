import { Auditoria } from 'src/comun/entities/auditoria.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { CategoriaProducto } from './categoriaProducto.entity';

@Entity()
export class Producto extends Auditoria {
  @Column({ length: 150 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @Column({ type: 'int', nullable: true })
  disponibilidad: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  imagen: string | null;

  @ManyToOne(() => CategoriaProducto, (categoria) => categoria.productos, {
    eager: true,
    nullable: false,
  })
  categoria: CategoriaProducto;
}
