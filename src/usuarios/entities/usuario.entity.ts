import { Entity, Column, OneToMany, OneToOne } from 'typeorm';
import { RolUsuario } from '../entities/rolUsuario.entity';
import { Auditoria } from '../../comun/entities/auditoria.entity';

@Entity()
export class Usuario extends Auditoria {
  @Column({ length: 100 })
  nombre!: string;

  @Column({ length: 100 })
  apellido_paterno!: string;

  @Column({ length: 100 })
  apellido_materno!: string;

  @Column({ length: 100, unique: true })
  correo!: string;

  @Column()
  contraseña!: string;

  @OneToMany(() => RolUsuario, (usuarioRol) => usuarioRol.usuario)
  roles!: RolUsuario[];
}
