import { Module } from '@nestjs/common';
import { PedidosService } from './pedidosServices/pedidos.service';
import { PedidosController } from './pedidosControllers/pedidos.controller';

@Module({
  controllers: [PedidosController],
  providers: [PedidosService],
})
export class PedidosModule {}
