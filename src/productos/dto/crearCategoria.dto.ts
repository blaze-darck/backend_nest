import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CrearCategoriaProductoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;
}
