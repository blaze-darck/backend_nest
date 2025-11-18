import { Entity, Column, OneToMany, OneToOne } from 'typeorm';
import { RolUsuario } from '../entities/rolUsuario.entity';
import { Auditoria } from '../../comun/entities/auditoria.entity';

@Entity()
export class Usuario extends Auditoria {
  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100 })
  apellidoPaterno: string;

  @Column({ length: 100 })
  apellidoMaterno: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  ci: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefono: string;

  @Column({ length: 100 })
  nombreUsuario: string;

  @Column({ length: 100, unique: true })
  correo: string;

  @Column()
  contrasena: string;

  @OneToMany(() => RolUsuario, (usuarioRol) => usuarioRol.usuario)
  roles: RolUsuario[];
}
