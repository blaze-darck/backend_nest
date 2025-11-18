import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from '../usuarios/entities/rol.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { RolUsuario } from '../usuarios/entities/rolUsuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rol, Usuario, RolUsuario])],
  providers: [SeedService],
})
export class SeedModule {}
