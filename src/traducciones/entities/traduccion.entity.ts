// src/traducciones/entities/traduccion.entity.ts
import { Entity, Column, Index } from 'typeorm';
import { Auditoria } from '../../comun/entities/auditoria.entity';

export enum TipoEntidad {
  PRODUCTO = 'producto',
  CATEGORIA = 'categoria',
  SUBCATEGORIA = 'subcategoria',
  ESTADO_PEDIDO = 'estado_pedido',
  ROL = 'rol',
  MENSAJE_ERROR = 'mensaje_error',
}

export enum Idioma {
  ES = 'es',
  EN = 'en',
  AY = 'ay',
}

export enum CampoTraducible {
  NOMBRE = 'nombre',
  DESCRIPCION = 'descripcion',
}

@Entity()
@Index(['entidad', 'entidadId', 'idioma', 'campo'], { unique: true })
export class Traduccion extends Auditoria {
  @Column({
    type: 'enum',
    enum: TipoEntidad,
  })
  entidad: TipoEntidad;

  @Column({ type: 'int' })
  entidadId: number;

  @Column({
    type: 'enum',
    enum: Idioma,
  })
  idioma: Idioma;

  @Column({
    type: 'enum',
    enum: CampoTraducible,
  })
  campo: CampoTraducible;

  @Column({ type: 'text' })
  valor: string;
}
