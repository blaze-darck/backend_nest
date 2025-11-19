import { Injectable, NotFoundException } from '@nestjs/common';

import { ProductoRepository } from '../productoRepositories/producto.repository';
import { categoriaProductoRepository } from '../productoRepositories/categoriaProducto.repository';

@Injectable()
export class ProductosService {
  constructor(
    private readonly productoRepository: ProductoRepository,
    private readonly categoriaRepository: categoriaProductoRepository,
  ) {}

  findAll() {
    return this.productoRepository.find({
      where: { activo: true },
      relations: ['categoria'],
    });
  }

  async findOne(id: number) {
    const producto = await this.productoRepository.findOne({
      where: { id, activo: true },
      relations: ['categoria'],
    });

    if (!producto) throw new NotFoundException('Producto no encontrado');
    return producto;
  }

  async createProducto(data: any) {
    const { categoriaId, ...resto } = data;

    const categoria = await this.categoriaRepository.findOne({
      where: { id: categoriaId, activo: true },
    });

    if (!categoria) throw new NotFoundException('Categoría no encontrada');

    const producto = this.productoRepository.create({
      ...resto,
      categoria,
    });

    return this.productoRepository.save(producto);
  }

  private async aplicarCambios(producto: any, data: any) {
    if (data.categoriaId) {
      const categoria = await this.categoriaRepository.findOne({
        where: { id: data.categoriaId, activo: true },
      });

      if (!categoria)
        throw new NotFoundException('La categoría especificada no existe');

      producto.categoria = categoria;
    }

    Object.assign(producto, data);
    return this.productoRepository.save(producto);
  }

  async updateProducto(id: number, data: any) {
    const producto = await this.findOne(id);
    return this.aplicarCambios(producto, data);
  }

  async partialUpdateProducto(id: number, data: any) {
    const producto = await this.findOne(id);
    return this.aplicarCambios(producto, data);
  }

  async desactivarProducto(id: number) {
    const producto = await this.findOne(id);
    producto.activo = false;
    return this.productoRepository.save(producto);
  }

  async cambiarCategoriaProducto(productoId: number, categoriaId: number) {
    const producto = await this.findOne(productoId);

    const categoria = await this.categoriaRepository.findOne({
      where: { id: categoriaId, activo: true },
    });

    if (!categoria) throw new NotFoundException('Categoría no encontrada');

    producto.categoria = categoria;

    return this.productoRepository.save(producto);
  }
}
