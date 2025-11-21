import { Module } from '@nestjs/common';
import { PedidosService } from './pedidosServices/pedidos.service';
import { PedidosController } from './pedidosControllers/pedidos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './pedidosEntities/pedidos.entity';
import { DetallePedido } from './pedidosEntities/detallePedido.entity';
import { Pago } from './pedidosEntities/pagos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido, DetallePedido, Pago])],
  controllers: [PedidosController],
  providers: [PedidosService],
})
export class PedidosModule {}
