import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseInterceptors,
  UploadedFile,
  Headers,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductoService } from '../productoService/productos.service';

@Controller('productos')
export class ProductoController {
  constructor(private readonly service: ProductoService) {}

  private obtenerIdioma(headers: any): string {
    const customLang = headers['x-app-language'];
    if (customLang) return customLang;

    const acceptLang = headers['accept-language'];
    if (acceptLang) return acceptLang.split(',')[0].split('-')[0];

    return 'es';
  }

  @Get()
  findAll(@Headers() headers: any) {
    const idioma = this.obtenerIdioma(headers);
    return this.service.findAll(idioma);
  }

  @Get('activos')
  findAllActive(@Headers() headers: any) {
    const idioma = this.obtenerIdioma(headers);
    return this.service.findAllActive(idioma);
  }

  @Get(':id')
  findById(@Param('id') id: number, @Headers() headers: any) {
    const idioma = this.obtenerIdioma(headers);
    return this.service.findById(id, idioma);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('imagen'))
  create(@UploadedFile() file: Express.Multer.File, @Body() body) {
    return this.service.create({
      ...body,
      imagen: file?.filename ?? null,
    });
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('imagen'))
  update(
    @Param('id') id: number,
    @UploadedFile() imagen: Express.Multer.File,
    @Body() data: any,
  ) {
    return this.service.update(id, {
      ...data,
      imagen: imagen ? imagen.filename : null,
    });
  }

  @Patch(':id/estado')
  toggleEstado(@Param('id') id: number, @Body('activo') activo: boolean) {
    return this.service.toggleEstado(id, activo);
  }

  @Delete(':id')
  softDelete(@Param('id') id: number) {
    return this.service.softDelete(id);
  }
}
