import { Entity, Column, ManyToOne, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Auditoria } from '../../comun/entities/auditoria.entity';
import { Pedido } from './pedidos.entity';
import { Producto } from '../../productos/productosEntities/producto.entity';

@Entity()
export class DetallePedido extends Auditoria {
  @ManyToOne(() => Pedido, (pedido) => pedido.detalles, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  pedido: Pedido;

  @ManyToOne(() => Producto, { onDelete: 'CASCADE', nullable: false })
  producto: Producto;

  @Column({ type: 'int' })
  cantidad: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio_unit: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;

  @BeforeInsert()
  @BeforeUpdate()
  calcularSubtotal() {
    this.subtotal = Number(this.cantidad) * Number(this.precio_unit);
  }
}
