import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoriaProductoRepository } from '../productoRepositories/categoriaProducto.repository';
import { TraduccionService } from '../../traducciones/services/traduccion.service';
import {
  TipoEntidad,
  Idioma,
} from '../../traducciones/entities/traduccion.entity';

@Injectable()
export class CategoriaProductoService {
  constructor(
    private readonly repo: CategoriaProductoRepository,
    private readonly traduccionService: TraduccionService,
  ) {}

  async findAll(idioma: string = 'es') {
    const categorias = await this.repo.findAll();

    if (idioma === 'es') {
      return categorias;
    }

    return this.aplicarTraducciones(categorias, idioma as Idioma);
  }

  async findById(id: number, idioma: string = 'es') {
    const categoria = await this.repo.findById(id);

    if (!categoria) {
      throw new NotFoundException('Categoría no encontrada');
    }

    if (idioma === 'es') {
      return categoria;
    }

    const [categoriaTraducida] = await this.aplicarTraducciones(
      [categoria],
      idioma as Idioma,
    );
    return categoriaTraducida;
  }

  create(data: any) {
    return this.repo.create(data);
  }

  update(id: number, data: any) {
    return this.repo.update(id, data);
  }

  async softDelete(id: number) {
    await this.findById(id);

    // Eliminar traducciones asociadas
    await this.traduccionService.eliminarPorEntidad(TipoEntidad.CATEGORIA, id);

    return this.repo.softDelete(id);
  }

  private async aplicarTraducciones(categorias: any[], idioma: Idioma) {
    if (!categorias || categorias.length === 0) {
      return categorias;
    }

    const ids = categorias.map((c) => c.id);
    const traduccionesMap = await this.traduccionService.obtenerMasivo(
      TipoEntidad.CATEGORIA,
      ids,
      idioma,
    );

    return categorias.map((categoria) => {
      const traducciones = traduccionesMap.get(categoria.id);

      return {
        ...categoria,
        nombre: traducciones?.nombre || categoria.nombre,
        descripcion: traducciones?.descripcion || categoria.descripcion,
      };
    });
  }
}
