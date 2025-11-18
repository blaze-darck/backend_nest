import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Usuario } from '../entities/usuario.entity';
import { Rol } from '../entities/rol.entity';
import { RolUsuario } from '../entities/rolUsuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,

    @InjectRepository(Rol)
    private readonly rolRepo: Repository<Rol>,

    @InjectRepository(RolUsuario)
    private readonly rolUsuarioRepo: Repository<RolUsuario>,
  ) {}

  findAll() {
    return this.usuarioRepo.find({
      where: { activo: true },
      relations: ['roles', 'roles.rol'],
    });
  }

  async findOne(id: number) {
    const usuario = await this.usuarioRepo.findOne({
      where: { id, activo: true },
      relations: ['roles', 'roles.rol'],
    });

    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    return usuario;
  }

  async findByCorreo(correo: string) {
    return this.usuarioRepo.findOne({ where: { correo, activo: true } });
  }

  create(data: any) {
    const usuario = this.usuarioRepo.create(data);
    return this.usuarioRepo.save(usuario);
  }

  async update(id: number, data: any) {
    const usuario = await this.findOne(id);
    Object.assign(usuario, data);
    return this.usuarioRepo.save(usuario);
  }

  async partialUpdate(id: number, data: any) {
    const usuario = await this.findOne(id);
    Object.assign(usuario, data);
    return this.usuarioRepo.save(usuario);
  }

  async desactivar(id: number) {
    const usuario = await this.findOne(id);
    usuario.activo = false;
    return this.usuarioRepo.save(usuario);
  }

  async asignarRol(usuarioId: number, rolId: number) {
    const usuario = await this.findOne(usuarioId);
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
