import { Auditoria } from 'src/comun/entities/auditoria.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class CategoriaProducto extends Auditoria {
  @Column({ length: 100 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;
}
