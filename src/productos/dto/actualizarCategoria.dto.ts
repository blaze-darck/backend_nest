import { PartialType } from '@nestjs/mapped-types';
import { CrearCategoriaProductoDto } from './crearCategoria.dto';

export class ActualizarCategoriaProductoDto extends PartialType(
  CrearCategoriaProductoDto,
) {}
