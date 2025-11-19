import { IsNotEmpty, isNotEmpty, IsNumber, IsString } from 'class-validator';

export class CrearProductoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsNumber()
  @IsNotEmpty()
  precio: number;

  @IsString()
  disponibilidad?: string;
}
