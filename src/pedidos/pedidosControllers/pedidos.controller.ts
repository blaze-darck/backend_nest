import { Controller } from '@nestjs/common';
import { PedidosService } from '../pedidosServices/pedidos.service';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}
}
