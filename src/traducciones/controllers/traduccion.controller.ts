import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { TraduccionService } from '../services/traduccion.service';
import { CrearTraduccionDto } from '../dto/crearTraduccion.dto';
import { ActualizarTraduccionDto } from '../dto/actualizarTraduccion.dto';
import { CrearTraduccionMasivaDto } from '../dto/crearTraduccionMasiva.dto';
import { TipoEntidad, Idioma } from '../entities/traduccion.entity';

@Controller('traducciones')
export class TraduccionController {
  constructor(private readonly service: TraduccionService) {}

  @Post()
  crear(@Body() dto: CrearTraduccionDto) {
    return this.service.crear(dto);
  }

  @Post('masivo')
  crearMasivo(@Body() dto: CrearTraduccionMasivaDto) {
    return this.service.crearMasivo(dto);
  }

  @Get(':entidad/:entidadId')
  obtenerPorEntidad(
    @Param('entidad') entidad: TipoEntidad,
    @Param('entidadId') entidadId: number,
    @Query('idioma') idioma: Idioma = Idioma.ES,
  ) {
    return this.service.obtenerPorEntidad(entidad, entidadId, idioma);
  }

  @Patch(':id')
  actualizar(@Param('id') id: number, @Body() dto: ActualizarTraduccionDto) {
    return this.service.actualizar(id, dto);
  }

  @Delete(':id')
  eliminar(@Param('id') id: number) {
    return this.service.eliminar(id);
  }

  @Delete(':entidad/:entidadId/todas')
  eliminarPorEntidad(
    @Param('entidad') entidad: TipoEntidad,
    @Param('entidadId') entidadId: number,
  ) {
    return this.service.eliminarPorEntidad(entidad, entidadId);
  }
}
