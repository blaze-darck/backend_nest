import { Auditoria } from 'src/comun/entities/auditoria.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Producto } from './producto.entity';

@Entity()
export class CategoriaProducto extends Auditoria {
  @Column({ length: 100 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @OneToMany(() => Producto, (producto) => producto.categoria)
  productos: Producto[];
}
