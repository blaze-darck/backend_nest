import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Traduccion, TipoEntidad, Idioma } from '../entities/traduccion.entity';

@Injectable()
export class TraduccionRepository {
  constructor(
    @InjectRepository(Traduccion)
    private readonly repo: Repository<Traduccion>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  obtenerPorEntidad(entidad: TipoEntidad, entidadId: number, idioma: Idioma) {
    return this.repo.find({
      where: {
        entidad,
        entidadId,
        idioma,
        activo: true,
      },
    });
  }

  obtenerMasivas(entidad: TipoEntidad, entidadIds: number[], idioma: Idioma) {
    return this.repo.find({
      where: {
        entidad,
        entidadId: In(entidadIds),
        idioma,
        activo: true,
      },
    });
  }

  async existeTraduccion(
    entidad: TipoEntidad,
    entidadId: number,
    idioma: Idioma,
    campo: string,
  ): Promise<boolean> {
    const count = await this.repo.count({
      where: {
        entidad,
        entidadId,
        idioma,
        campo: campo as any,
      },
    });
    return count > 0;
  }

  create(data: Partial<Traduccion>) {
    const traduccion = this.repo.create(data);
    return this.repo.save(traduccion);
  }

  async update(id: number, data: Partial<Traduccion>) {
    await this.repo.update(id, data);
    return this.findById(id);
  }

  async softDelete(id: number) {
    await this.repo.update(id, { activo: false });
    return { message: 'Traducción desactivada', id };
  }

  async eliminarPorEntidad(entidad: TipoEntidad, entidadId: number) {
    await this.repo.update({ entidad, entidadId }, { activo: false });
  }
}
