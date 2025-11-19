import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { UsuarioRepository } from '../repositories/usuario.repository';
import { RolRepository } from '../repositories/rol.repository';
import { RolUsuarioRepository } from '../repositories/rolUsuario.repository';

@Injectable()
export class UsuarioService {
  constructor(
    private readonly usuarioRepository: UsuarioRepository,
    private readonly rolRepository: RolRepository,
    private readonly rolUsuarioRepository: RolUsuarioRepository,
  ) {}

  findAll() {
    return this.usuarioRepository.find({
      where: { activo: true },
      relations: ['roles', 'roles.rol'],
    });
  }

  async findOne(id: number) {
    const usuario = await this.usuarioRepository.findOne({
      where: { id, activo: true },
      relations: ['roles', 'roles.rol'],
    });

    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    return usuario;
  }

  async findByCorreo(correo: string) {
    return this.usuarioRepository.findOne({ where: { correo, activo: true } });
  }

  create(data: any) {
    const usuario = this.usuarioRepository.create(data);
    return this.usuarioRepository.save(usuario);
  }

  async update(id: number, data: any) {
    const usuario = await this.findOne(id);
    Object.assign(usuario, data);
    return this.usuarioRepository.save(usuario);
  }

  async partialUpdate(id: number, data: any) {
    const usuario = await this.findOne(id);
    Object.assign(usuario, data);
    return this.usuarioRepository.save(usuario);
  }

  async desactivar(id: number) {
    const usuario = await this.findOne(id);
    usuario.activo = false;
    return this.usuarioRepository.save(usuario);
  }

  async asignarRol(usuarioId: number, rolId: number) {
    const usuario = await this.findOne(usuarioId);
    const rol = await this.rolRepository.findOne({
      where: { id: rolId, activo: true },
    });

    if (!rol) throw new NotFoundException('Rol no encontrado');

    const existe = await this.rolUsuarioRepository.findOne({
      where: { usuario: { id: usuarioId }, rol: { id: rolId }, activo: true },
    });

    if (existe)
      throw new BadRequestException('El usuario ya tiene este rol asignado');

    const rolUsuario = this.rolUsuarioRepository.create({ usuario, rol });
    return this.rolUsuarioRepository.save(rolUsuario);
  }

  async quitarRol(usuarioId: number, rolId: number) {
    const registro = await this.rolUsuarioRepository.findOne({
      where: { usuario: { id: usuarioId }, rol: { id: rolId }, activo: true },
    });

    if (!registro)
      throw new NotFoundException('El rol no está asignado al usuario');

    registro.activo = false;
    return this.rolUsuarioRepository.save(registro);
  }
}
