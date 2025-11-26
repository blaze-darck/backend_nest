import { IsEnum, IsOptional } from 'class-validator';
import { EstadoPedido } from '../pedidosEntities/pedidos.entity';

export class QueryPedidosDto {
  @IsEnum(EstadoPedido)
  @IsOptional()
  estado?: EstadoPedido;
}