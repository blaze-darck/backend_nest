import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
  ArrayMinSize,
  IsInt,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { MetodoPago } from '../pedidosEntities/pedidos.entity';

export class ItemPedidoDto {
  @IsInt({ message: 'El productoId debe ser un número entero' })
  @IsNotEmpty({ message: 'El productoId es requerido' })
  productoId: number;

  @IsInt({ message: 'La cantidad debe ser un número entero' })
  @Min(1, { message: 'La cantidad debe ser al menos 1' })
  @IsNotEmpty({ message: 'La cantidad es requerida' })
  cantidad: number;
}

export class CreatePedidoDto {
  @IsArray({ message: 'Los items deben ser un array' })
  @ArrayMinSize(1, { message: 'Debe haber al menos un producto en el pedido' })
  @ValidateNested({ each: true })
  @Type(() => ItemPedidoDto)
  items: ItemPedidoDto[];

  @IsEnum(MetodoPago, { message: 'Método de pago inválido' })
  @IsNotEmpty({ message: 'El método de pago es requerido' })
  metodoPago: MetodoPago;

  @IsString()
  @IsOptional()
  notas?: string;
}
