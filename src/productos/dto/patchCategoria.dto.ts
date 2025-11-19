import { PartialType } from '@nestjs/mapped-types';
import { CrearCategoriaProductoDto } from './crearCategoria.dto';

export class PatchCategoriaProductoDto extends PartialType(
  CrearCategoriaProductoDto,
) {}
