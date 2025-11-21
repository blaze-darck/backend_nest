import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { Auditoria } from '../../comun/entities/auditoria.entity';
import { DetallePedido } from './detallePedido.entity';
import { Pago } from './pagos.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity()
export class Pedido extends Auditoria {
  @ManyToOne(() => Usuario, { nullable: true, eager: false })
  cliente: Usuario;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  total: number;

  @OneToMany(() => DetallePedido, (detalle) => detalle.pedido, {
    cascade: true,
    eager: false,
  })
  detalles: DetallePedido[];

  @OneToMany(() => Pago, (pago) => pago.pedido, {
    cascade: true,
    eager: false,
  })
  pagos: Pago[];
}
