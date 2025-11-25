import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductoRepository } from '../productoRepositories/producto.repository';

@Injectable()
export class ProductoService {
  constructor(private readonly repo: ProductoRepository) {}

  findAll() {
    return this.repo.findAll();
  }

  async findById(id: number) {
    const producto = await this.repo.findById(id);
    if (!producto) throw new NotFoundException('Producto no encontrado');
    return producto;
  }

  create(data: any) {
    return this.repo.create(data);
  }

  update(id: number, data: any) {
    return this.repo.update(id, data);
  }

  softDelete(id: number) {
    return this.repo.softDelete(id);
  }
}
