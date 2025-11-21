import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Pago } from '../pedidosEntities/pagos.entity';

@Injectable()
export class PagoRepository extends Repository<Pago> {
  constructor(private dataSource: DataSource) {
    super(Pago, dataSource.createEntityManager());
  }
}
