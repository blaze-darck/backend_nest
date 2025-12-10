import { IsEnum, IsNotEmpty, IsString, IsInt } from 'class-validator';
import {
  TipoEntidad,
  Idioma,
  CampoTraducible,
} from '../entities/traduccion.entity';

export class CrearTraduccionDto {
  @IsEnum(TipoEntidad)
  @IsNotEmpty()
  entidad: TipoEntidad;

  @IsInt()
  @IsNotEmpty()
  entidadId: number;

  @IsEnum(Idioma)
  @IsNotEmpty()
  idioma: Idioma;

  @IsEnum(CampoTraducible)
  @IsNotEmpty()
  campo: CampoTraducible;

  @IsString()
  @IsNotEmpty()
  valor: string;
}
