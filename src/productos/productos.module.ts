import { Module } from '@nestjs/common';
import { ProductoService } from '../productos/productoService/productos.service';
import { ProductoController } from './productoControllers/productos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './productosEntities/producto.entity';
import { CategoriaProducto } from './productosEntities/categoriaProducto.entity';
import { ProductoRepository } from './productoRepositories/producto.repository';
import { CategoriaProductoRepository } from '../productos/productoRepositories/categoriaProducto.repository';
import { CategoriaProductoService } from './productoService/categoriaProducto.service';
import { CategoriaProductoController } from './productoControllers/categoriaProductos.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([Producto, CategoriaProducto]),

    // 👇 REGISTRAR MULTER PARA SUBIR IMÁGENES
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/productos',
        filename: (req, file, callback) => {
          const filename = `${Date.now()}-${Math.round(
            Math.random() * 1e9,
          )}${extname(file.originalname)}`;
          callback(null, filename);
        },
      }),
      limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB
      },
    }),
  ],
  controllers: [ProductoController, CategoriaProductoController],
  providers: [
    ProductoService,
    CategoriaProductoService,
    ProductoRepository,
    CategoriaProductoRepository,
  ],
  exports: [
    ProductoRepository,
    CategoriaProductoRepository,
    ProductoService,
    CategoriaProductoService,
  ],
})
export class ProductosModule {}
