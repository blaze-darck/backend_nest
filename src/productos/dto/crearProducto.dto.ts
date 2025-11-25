import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class CrearProductoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsNumber()
  @IsPositive()
  precio: number;

  @IsOptional()
  @IsNumber()
  disponibilidad?: number;

  @IsNumber()
  @IsPositive()
  categoriaId: number;
}
