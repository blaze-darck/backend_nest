import { Injectable, NotFoundException } from '@nestjs/common';

import { categoriaProductoRepository } from '../productoRepositories/categoriaProducto.repository';

@Injectable()
export class CategoriaProductoService {
  constructor(
    private readonly categoriaRepository: categoriaProductoRepository,
  ) {}

  findAll() {
    return this.categoriaRepository.find({
      where: { activo: true },
    });
  }

  async findOne(id: number) {
    const categoria = await this.categoriaRepository.findOne({
      where: { id, activo: true },
    });

    if (!categoria) throw new NotFoundException('Categoría no encontrada');
    return categoria;
  }

  async create(data: any) {
    const categoria = this.categoriaRepository.create(data);
    return this.categoriaRepository.save(categoria);
  }

  async update(id: number, data: any) {
    const categoria = await this.findOne(id);

    Object.assign(categoria, data);
    return this.categoriaRepository.save(categoria);
  }

  async partialUpdate(id: number, data: any) {
    const categoria = await this.findOne(id);

    Object.assign(categoria, data);
    return this.categoriaRepository.save(categoria);
  }

  async desactivar(id: number) {
    const categoria = await this.findOne(id);

    categoria.activo = false;
    return this.categoriaRepository.save(categoria);
  }
}
