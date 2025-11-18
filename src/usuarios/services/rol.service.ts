import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from '../entities/rol.entity';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Rol)
    private readonly rolRepo: Repository<Rol>,
  ) {}

  // Obtener solo roles activos
  findAll() {
    return this.rolRepo.find({ where: { activo: true } });
  }

  async findOne(id: number) {
    const rol = await this.rolRepo.findOne({ where: { id, activo: true } });
    if (!rol) throw new NotFoundException('Rol no encontrado');
    return rol;
  }

  create(data: any) {
    const rol = this.rolRepo.create(data);
    return this.rolRepo.save(rol);
  }

  async update(id: number, data: any) {
    const rol = await this.findOne(id);
    Object.assign(rol, data);
    return this.rolRepo.save(rol);
  }

  // Borrado lógico
  async desactivar(id: number) {
    const rol = await this.findOne(id);
    rol.activo = false;
    return this.rolRepo.save(rol);
  }
}
