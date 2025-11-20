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
import { ProductosService } from '../productoService/productos.service';
import { CrearProductoDto } from '../dto/crearProducto.dto';
import { ActualizarProductoDto } from '../dto/actualizarProducto.dto';
import { PatchProductoDto } from '../dto/patchProducto.dto';

@Controller('productos')
export class ProductoController {
  constructor(private readonly productoService: ProductosService) {}

  @Get()
  findAll() {
    return this.productoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productoService.findOne(id);
  }

  @Post()
  create(@Body() data: CrearProductoDto) {
    return this.productoService.createProducto(data);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: ActualizarProductoDto,
  ) {
    return this.productoService.updateProducto(id, data);
  }

  @Patch(':id')
  partialUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: PatchProductoDto,
  ) {
    return this.productoService.partialUpdateProducto(id, data);
  }

  @Delete(':id')
  desactivar(@Param('id', ParseIntPipe) id: number) {
    return this.productoService.desactivarProducto(id);
  }

  @Patch(':id/categoria/:categoriaId')
  cambiarCategoria(
    @Param('id', ParseIntPipe) productoId: number,
    @Param('categoriaId', ParseIntPipe) categoriaId: number,
  ) {
    return this.productoService.cambiarCategoriaProducto(
      productoId,
      categoriaId,
    );
  }
}
