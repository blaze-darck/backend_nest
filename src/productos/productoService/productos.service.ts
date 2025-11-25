import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductoRepository } from '../productoRepositories/producto.repository';
import { categoriaProductoRepository } from '../productoRepositories/categoriaProducto.repository';
import { CrearProductoDto } from '../dto/crearProducto.dto';
import { ActualizarProductoDto } from '../dto/actualizarProducto.dto';
import { PatchProductoDto } from '../dto/patchProducto.dto';

@Injectable()
export class ProductosService {
  constructor(
    private readonly productoRepository: ProductoRepository,
    private readonly categoriaRepository: categoriaProductoRepository,
  ) {}

  findAll() {
    return this.productoRepository.find({
      where: { activo: true },
      relations: {
        categoria: { parent: true }, // Trae también la categoría padre
      },
    });
  }

  // Obtener un producto por ID con categoría y subcategoría
  async findOne(id: number) {
    const producto = await this.productoRepository.findOne({
      where: { id, activo: true },
      relations: {
        categoria: { parent: true },
      },
    });

    if (!producto) throw new NotFoundException('Producto no encontrado');
    return producto;
  }

  // ✅ Crear producto con imagen
  async createProducto(data: CrearProductoDto, imagen?: string) {
    const { categoriaId, ...resto } = data;

    const categoria = await this.categoriaRepository.findOne({
      where: { id: categoriaId, activo: true },
    });

    if (!categoria) throw new NotFoundException('Categoría no encontrada');

    const producto = this.productoRepository.create({
      ...resto,
      categoria,
      imagen: imagen ? `/uploads/productos/${imagen}` : null,
    });

    return this.productoRepository.save(producto);
  }

  // ✅ Método privado para aplicar cambios a un producto
  private async aplicarCambios(
    producto: any,
    data: ActualizarProductoDto | PatchProductoDto,
    imagen?: string,
  ) {
    // Actualizar imagen si se proporciona
    if (imagen) {
      producto.imagen = `/uploads/productos/${imagen}`;
    }

    // Cambiar categoría si se proporciona
    if (data.categoriaId) {
      const categoria = await this.categoriaRepository.findOne({
        where: { id: data.categoriaId, activo: true },
      });
      if (!categoria)
        throw new NotFoundException('La categoría especificada no existe');

      producto.categoria = categoria;
    }

    // Asignar el resto de los cambios
    Object.assign(producto, data);
    return this.productoRepository.save(producto);
  }

  // ✅ Actualizar producto con PUT
  async updateProducto(
    id: number,
    data: ActualizarProductoDto,
    imagen?: string,
  ) {
    const producto = await this.findOne(id);
    return this.aplicarCambios(producto, data, imagen);
  }

  // ✅ Actualizar parcialmente producto con PATCH
  async partialUpdateProducto(
    id: number,
    data: PatchProductoDto,
    imagen?: string,
  ) {
    const producto = await this.findOne(id);
    return this.aplicarCambios(producto, data, imagen);
  }

  // ✅ Desactivar producto
  async desactivarProducto(id: number) {
    const producto = await this.findOne(id);
    producto.activo = false;
    return this.productoRepository.save(producto);
  }

  // ✅ Cambiar categoría de un producto
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
