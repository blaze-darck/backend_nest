import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductoRepository } from '../productoRepositories/producto.repository';
import { TraduccionService } from '../../traducciones/services/traduccion.service';
import {
  TipoEntidad,
  Idioma,
} from '../../traducciones/entities/traduccion.entity';

@Injectable()
export class ProductoService {
  constructor(
    private readonly repo: ProductoRepository,
    private readonly traduccionService: TraduccionService,
  ) {}

  async findAll(idioma: string = 'es') {
    const productos = await this.repo.findAll();

    if (idioma === 'es') {
      return productos;
    }

    return this.aplicarTraducciones(productos, idioma as Idioma);
  }

  async findAllActive(idioma: string = 'es') {
    const productos = await this.repo.findAllActive();

    if (idioma === 'es') {
      return productos;
    }

    return this.aplicarTraducciones(productos, idioma as Idioma);
  }

  async findById(id: number, idioma: string = 'es') {
    const producto = await this.repo.findById(id);

    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }

    if (idioma === 'es') {
      return producto;
    }

    const [productoTraducido] = await this.aplicarTraducciones(
      [producto],
      idioma as Idioma,
    );
    return productoTraducido;
  }

  create(data: any) {
    return this.repo.create(data);
  }

  update(id: number, data: any) {
    return this.repo.update(id, data);
  }

  async toggleEstado(id: number, activo: boolean) {
    await this.findById(id);
    return this.repo.update(id, { activo });
  }

  async softDelete(id: number) {
    await this.findById(id);

    // Eliminar traducciones asociadas
    await this.traduccionService.eliminarPorEntidad(TipoEntidad.PRODUCTO, id);

    return this.repo.softDelete(id);
  }

  // ⭐ Método privado para aplicar traducciones
  private async aplicarTraducciones(productos: any[], idioma: Idioma) {
    if (!productos || productos.length === 0) {
      return productos;
    }

    const ids = productos.map((p) => p.id);
    const traduccionesMap = await this.traduccionService.obtenerMasivo(
      TipoEntidad.PRODUCTO,
      ids,
      idioma,
    );

    return productos.map((producto) => {
      const traducciones = traduccionesMap.get(producto.id);

      return {
        ...producto,
        nombre: traducciones?.nombre || producto.nombre,
        descripcion: traducciones?.descripcion || producto.descripcion,
      };
    });
  }
}
