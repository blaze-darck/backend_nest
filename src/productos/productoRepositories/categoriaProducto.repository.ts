import { Injectable } from '@nestjs/common';
import { CategoriaProducto } from '../productosEntities/categoriaProducto.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class categoriaProductoRepository extends Repository<CategoriaProducto> {
  constructor(private dataSource: DataSource) {
    super(CategoriaProducto, dataSource.createEntityManager());
  }
}
