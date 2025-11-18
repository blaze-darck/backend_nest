import { Controller, Get, Post, Put, Patch, Body, Param } from '@nestjs/common';
import { UsuarioService } from '../services/usuario.service';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usuarioService.findOne(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.usuarioService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: any) {
    return this.usuarioService.update(id, data);
  }

  @Patch(':id')
  partialUpdate(@Param('id') id: number, @Body() data: any) {
    return this.usuarioService.partialUpdate(id, data);
  }

  @Post(':id/roles/:rolId')
  asignarRol(@Param('id') usuarioId: number, @Param('rolId') rolId: number) {
    return this.usuarioService.asignarRol(usuarioId, rolId);
  }

  @Patch(':id/roles/:rolId/quitar')
  quitarRol(@Param('id') usuarioId: number, @Param('rolId') rolId: number) {
    return this.usuarioService.quitarRol(usuarioId, rolId);
  }
}
