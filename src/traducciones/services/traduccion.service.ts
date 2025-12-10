import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { TraduccionRepository } from '../repositories/traduccion.repository';
import { CrearTraduccionDto } from '../dto/crearTraduccion.dto';
import { ActualizarTraduccionDto } from '../dto/actualizarTraduccion.dto';
import { CrearTraduccionMasivaDto } from '../dto/crearTraduccionMasiva.dto';
import { Traduccion, TipoEntidad, Idioma } from '../entities/traduccion.entity';

@Injectable()
export class TraduccionService {
  constructor(private readonly repo: TraduccionRepository) {}

  async crear(dto: CrearTraduccionDto): Promise<Traduccion> {
    const existe = await this.repo.existeTraduccion(
      dto.entidad,
      dto.entidadId,
      dto.idioma,
      dto.campo,
    );

    if (existe) {
      throw new ConflictException(
        `Ya existe una traducción para ${dto.entidad} con ID ${dto.entidadId} en idioma ${dto.idioma} para el campo ${dto.campo}`,
      );
    }

    return this.repo.create(dto);
  }

  async crearMasivo(dto: CrearTraduccionMasivaDto): Promise<Traduccion[]> {
    const traducciones: Traduccion[] = [];

    for (const campo of dto.campos) {
      const existe = await this.repo.existeTraduccion(
        dto.entidad,
        dto.entidadId,
        dto.idioma,
        campo.campo,
      );

      if (!existe) {
        const traduccion = await this.repo.create({
          entidad: dto.entidad,
          entidadId: dto.entidadId,
          idioma: dto.idioma,
          campo: campo.campo as any,
          valor: campo.valor,
        });
        traducciones.push(traduccion);
      }
    }

    if (traducciones.length === 0) {
      throw new ConflictException('Todas las traducciones ya existen');
    }

    return traducciones;
  }

  obtenerPorEntidad(entidad: TipoEntidad, entidadId: number, idioma: Idioma) {
    return this.repo.obtenerPorEntidad(entidad, entidadId, idioma);
  }

  async obtenerMasivo(
    entidad: TipoEntidad,
    entidadIds: number[],
    idioma: Idioma,
  ): Promise<Map<number, Record<string, string>>> {
    const traducciones = await this.repo.obtenerMasivas(
      entidad,
      entidadIds,
      idioma,
    );

    const mapa = new Map<number, Record<string, string>>();

    traducciones.forEach((t) => {
      if (!mapa.has(t.entidadId)) {
        mapa.set(t.entidadId, {});
      }
      mapa.get(t.entidadId)![t.campo] = t.valor;
    });

    return mapa;
  }

  async actualizar(id: number, dto: ActualizarTraduccionDto) {
    const traduccion = await this.repo.findById(id);

    if (!traduccion) {
      throw new NotFoundException(`Traducción con ID ${id} no encontrada`);
    }

    return this.repo.update(id, { valor: dto.valor });
  }

  async eliminar(id: number) {
    const traduccion = await this.repo.findById(id);

    if (!traduccion) {
      throw new NotFoundException(`Traducción con ID ${id} no encontrada`);
    }

    return this.repo.softDelete(id);
  }

  eliminarPorEntidad(entidad: TipoEntidad, entidadId: number) {
    return this.repo.eliminarPorEntidad(entidad, entidadId);
  }
}
