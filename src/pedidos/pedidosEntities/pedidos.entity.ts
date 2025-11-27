import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { DetallePedido } from './detallePedido.entity';
import { Auditoria } from 'src/comun/entities/auditoria.entity';

export enum EstadoPedido {
  PENDIENTE = 'PENDIENTE', // Cliente creó el pedido
  ACEPTADO = 'ACEPTADO', // Admin aceptó
  EN_PREPARACION = 'EN_PREPARACION', // Cocinero lo está haciendo
  LISTO = 'LISTO', // Cocinero terminó
  COMPLETADO = 'COMPLETADO', // Cajero cobró
  CANCELADO = 'CANCELADO', // Admin rechazó
}

export enum MetodoPago {
  QR = 'QR',
  EFECTIVO = 'EFECTIVO',
}

@Entity('pedidos')
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, name: 'numero_pedido' })
  numeroPedido: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.pedidos, { eager: true })
  @JoinColumn({ name: 'usuario_id' })
  cliente: Usuario;

  @Column({
    type: 'timestamp',
    name: 'fecha_pedido',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaPedido: Date;

  @Column({
    type: 'enum',
    enum: EstadoPedido,
    default: EstadoPedido.PENDIENTE,
  })
  estado: EstadoPedido;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column({
    type: 'enum',
    enum: MetodoPago,
    name: 'metodo_pago',
  })
  metodoPago: MetodoPago;

  @Column({ type: 'text', nullable: true })
  notas: string | null;

  @OneToMany(() => DetallePedido, (detalle) => detalle.pedido, {
    cascade: true,
    eager: true,
  })
  detalles: DetallePedido[];
}
