import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Usuario } from './entities/usuario.entity';
import { Rol } from './entities/rol.entity';
import { RolUsuario } from './entities/rolUsuario.entity';

import { UsuarioService } from './services/usuario.service';
import { RolService } from './services/rol.service';
import { RolUsuarioService } from './services/rolUsuario.service';

import { UsuarioController } from './controllers/usuario.controller';
import { RolController } from './controllers/rol.controller';
import { RolUsuarioController } from './controllers/rolUsuario.controller';
import { UsuarioRepository } from './repositories/usuario.repository';
import { RolRepository } from './repositories/rol.repository';
import { RolUsuarioRepository } from './repositories/rolUsuario.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Rol, RolUsuario])],
  controllers: [UsuarioController, RolController, RolUsuarioController],
  providers: [
    UsuarioService,
    RolService,
    RolUsuarioService,
    UsuarioRepository,
    RolRepository,
    RolUsuarioRepository,
  ],
  exports: [UsuarioService, RolService, RolUsuarioService],
})
export class UsuariosModule {}
