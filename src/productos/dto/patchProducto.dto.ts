import { PartialType } from '@nestjs/mapped-types';
import { CrearProductoDto } from './crearProducto.dto';

export class PatchProductoDto extends PartialType(CrearProductoDto) {}
