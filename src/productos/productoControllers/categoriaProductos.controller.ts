import {
  Controller,
  Get,
  Post,
  Patch,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { CategoriaProductoService } from '../productoService/categoriaProducto.service';
import { CrearCategoriaProductoDto } from '../dto/crearCategoria.dto';
import { ActualizarCategoriaProductoDto } from '../dto/actualizarCategoria.dto';
import { PatchCategoriaProductoDto } from '../dto/patchCategoria.dto';

@Controller('categorias-productos')
export class CategoriaProductoController {
  constructor(private readonly categoriaService: CategoriaProductoService) {}

  @Get()
  findAll() {
    return this.categoriaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriaService.findOne(id);
  }

  @Post()
  create(@Body() data: CrearCategoriaProductoDto) {
    return this.categoriaService.createCategoria(data);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: ActualizarCategoriaProductoDto,
  ) {
    return this.categoriaService.updateCategoria(id, data);
  }

  @Patch(':id')
  partialUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: PatchCategoriaProductoDto,
  ) {
    return this.categoriaService.partialUpdateCategoria(id, data);
  }

  @Delete(':id')
  desactivar(@Param('id', ParseIntPipe) id: number) {
    return this.categoriaService.desactivarCategoria(id);
  }
}
