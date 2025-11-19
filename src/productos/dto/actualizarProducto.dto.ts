import { PartialType } from '@nestjs/mapped-types';
import { CrearProductoDto } from './crearProducto.dto';

export class ActualizarProductoDto extends PartialType(CrearProductoDto) {}
