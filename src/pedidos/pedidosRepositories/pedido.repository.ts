import { Injectable } from '@nestjs/common';
import { Pedido } from '../pedidosEntities/pedidos.entity';
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm/browser';

@Injectable()
export class PedidoRepository extends Repository<Pedido> {
  constructor(private dataSource: DataSource) {
    super(Pedido, dataSource.createEntityManager());
  }
}
