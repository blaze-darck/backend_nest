import { IsEnum, IsNotEmpty } from 'class-validator';
import { EstadoPedido } from '../pedidosEntities/pedidos.entity';

export class UpdateEstadoPedidoDto {
  @IsEnum(EstadoPedido, { message: 'Estado inválido' })
  @IsNotEmpty({ message: 'El estado es requerido' })
  estado: EstadoPedido;
}