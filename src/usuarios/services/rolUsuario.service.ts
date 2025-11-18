import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolUsuario } from '../entities/rolUsuario.entity';
import { Usuario } from '../entities/usuario.entity';
import { Rol } from '../entities/rol.entity';

@Injectable()
export class RolUsuarioService {
  constructor(
    @InjectRepository(RolUsuario)
    private readonly rolUsuarioRepo: Repository<RolUsuario>,
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
    @InjectRepository(Rol)
    private readonly rolRepo: Repository<Rol>,
  ) {}

  // Obtener solo relaciones activas
  findAll() {
    return this.rolUsuarioRepo.find({
      where: { activo: true },
      relations: ['usuario', 'rol'],
    });
  }

  async asignarRol(usuarioId: number, rolId: number) {
    const usuario = await this.usuarioRepo.findOne({
      where: { id: usuarioId, activo: true },
    });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    const rol = await this.rolRepo.findOne({
      where: { id: rolId, activo: true },
    });
    if (!rol) throw new NotFoundException('Rol no encontrado');

    const existe = await this.rolUsuarioRepo.findOne({
      where: { usuario: { id: usuarioId }, rol: { id: rolId }, activo: true },
    });
    if (existe)
      throw new BadRequestException('El usuario ya tiene este rol asignado');

    const rolUsuario = this.rolUsuarioRepo.create({ usuario, rol });
    return this.rolUsuarioRepo.save(rolUsuario);
  }

  // Borrado lógico: desactivar la relación
  async quitarRol(usuarioId: number, rolId: number) {
    const registro = await this.rolUsuarioRepo.findOne({
      where: { usuario: { id: usuarioId }, rol: { id: rolId }, activo: true },
    });
    if (!registro)
      throw new NotFoundException('El rol no está asignado al usuario');

    registro.activo = false;
    return this.rolUsuarioRepo.save(registro);
  }
}
