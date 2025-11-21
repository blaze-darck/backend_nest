import { Entity, Column, ManyToOne } from 'typeorm';
import { Auditoria } from '../../comun/entities/auditoria.entity';
import { Pedido } from './pedidos.entity';

export enum MetodoPago {
  EFECTIVO = 'efectivo',
  TRANSFERENCIA_QR = 'transferenciaQR',
}

@Entity()
export class Pago extends Auditoria {
  @ManyToOne(() => Pedido, (pedido) => pedido.pagos, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  pedido: Pedido;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  monto: number;

  @Column({ type: 'enum', enum: MetodoPago })
  metodo: MetodoPago;
}
