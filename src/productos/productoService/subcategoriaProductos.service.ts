import { Injectable, NotFoundException } from '@nestjs/common';
import { SubcategoriaProductoRepository } from '../productoRepositories/subcategoriasProductos.repository';
import { TraduccionService } from '../../traducciones/services/traduccion.service';
import {
  TipoEntidad,
  Idioma,
} from '../../traducciones/entities/traduccion.entity';

@Injectable()
export class SubcategoriaProductoService {
  constructor(
    private readonly repo: SubcategoriaProductoRepository,
    private readonly traduccionService: TraduccionService,
  ) {}

  async findAll(idioma: string = 'es') {
    const subcategorias = await this.repo.findAll();

    if (idioma === 'es') {
      return subcategorias;
    }

    return this.aplicarTraducciones(subcategorias, idioma as Idioma);
  }

  async findById(id: number, idioma: string = 'es') {
    const subcategoria = await this.repo.findById(id);

    if (!subcategoria) {
      throw new NotFoundException('Subcategoría no encontrada');
    }

    if (idioma === 'es') {
      return subcategoria;
    }

    const [subcategoriaTraducida] = await this.aplicarTraducciones(
      [subcategoria],
      idioma as Idioma,
    );
    return subcategoriaTraducida;
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
    await this.traduccionService.eliminarPorEntidad(
      TipoEntidad.SUBCATEGORIA,
      id,
    );

    return this.repo.softDelete(id);
  }

  private async aplicarTraducciones(subcategorias: any[], idioma: Idioma) {
    if (!subcategorias || subcategorias.length === 0) {
      return subcategorias;
    }

    const ids = subcategorias.map((s) => s.id);
    const traduccionesMap = await this.traduccionService.obtenerMasivo(
      TipoEntidad.SUBCATEGORIA,
      ids,
      idioma,
    );

    return subcategorias.map((subcategoria) => {
      const traducciones = traduccionesMap.get(subcategoria.id);

      return {
        ...subcategoria,
        nombre: traducciones?.nombre || subcategoria.nombre,
        descripcion: traducciones?.descripcion || subcategoria.descripcion,
      };
    });
  }
}
