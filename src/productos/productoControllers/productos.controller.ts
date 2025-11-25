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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

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

  // 🚨 NUEVO: creación con imagen
  @Post()
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: './uploads/productos',
        filename: (req, file, callback) => {
          const archivo = `${Date.now()}${extname(file.originalname)}`;
          callback(null, archivo);
        },
      }),
    }),
  )
  create(@Body() data: CrearProductoDto, @UploadedFile() file: Express.Multer.File) {
    return this.productoService.createProducto(data, file?.filename);
  }

  // 🚨 NUEVO: actualización con imagen
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: './uploads/productos',
        filename: (req, file, callback) => {
          const archivo = `${Date.now()}${extname(file.originalname)}`;
          callback(null, archivo);
        },
      }),
    }),
  )
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: ActualizarProductoDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.productoService.updateProducto(id, data, file?.filename);
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
