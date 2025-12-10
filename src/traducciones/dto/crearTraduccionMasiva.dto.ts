import {
  IsEnum,
  IsNotEmpty,
  IsInt,
  ValidateNested,
  IsArray,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TipoEntidad, Idioma } from '../entities/traduccion.entity';

class TraduccionCampo {
  @IsString()
  @IsNotEmpty()
  campo: string;

  @IsString()
  @IsNotEmpty()
  valor: string;
}

export class CrearTraduccionMasivaDto {
  @IsEnum(TipoEntidad)
  @IsNotEmpty()
  entidad: TipoEntidad;

  @IsInt()
  @IsNotEmpty()
  entidadId: number;

  @IsEnum(Idioma)
  @IsNotEmpty()
  idioma: Idioma;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TraduccionCampo)
  campos: TraduccionCampo[];
}
