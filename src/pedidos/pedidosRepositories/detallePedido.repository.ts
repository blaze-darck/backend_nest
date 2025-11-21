import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { DetallePedido } from '../pedidosEntities/detallePedido.entity';

@Injectable()
export class DetallePedidoRepository extends Repository<DetallePedido> {
  constructor(private dataSource: DataSource) {
    super(DetallePedido, dataSource.createEntityManager());
  }
}
