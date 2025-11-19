import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Producto } from '../productosEntities/producto.entity';

@Injectable()
export class ProductoRepository extends Repository<Producto> {
  constructor(private dataSource: DataSource) {
    super(Producto, dataSource.createEntityManager());
  }

  async findByNombre(nombre: string) {
    return this.findOne({ where: { nombre } });
  }
}
