import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from '../usuarios/entities/rol.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { RolUsuario } from '../usuarios/entities/rolUsuario.entity';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Rol) private rolRepo: Repository<Rol>,
    @InjectRepository(Usuario) private usuarioRepo: Repository<Usuario>,
    @InjectRepository(RolUsuario)
    private rolUsuarioRepo: Repository<RolUsuario>,
  ) {}

  async onApplicationBootstrap() {
    console.log('Ejecutando llenado de datos');

    const count = await this.rolRepo.count();
    if (count > 0) {
      console.log('Seed omitido, ya existen datos.');
      return;
    }

    const roles = await this.rolRepo.save([
      { nombre: 'Admin', descripcion: 'Rol admin' },
      { nombre: 'Cliente', descripcion: 'Rol cliente' },
    ]);

    const usuarios = await this.usuarioRepo.save([
      {
        nombre: 'Juan',
        apellido_paterno: 'Pérez',
        apellido_materno: 'Gómez',
        correo: 'juan.perez@example.com',
        contraseña: '123456',
      },
      {
        nombre: 'María',
        apellido_paterno: 'López',
        apellido_materno: 'Ramírez',
        correo: 'maria.lopez@example.com',
        contraseña: '123456',
      },
    ]);

    await this.rolUsuarioRepo.save([
      { usuario: usuarios[0], rol: roles[0] },
      { usuario: usuarios[1], rol: roles[1] },
    ]);

    console.log('Seed ejecutado');
  }
}
