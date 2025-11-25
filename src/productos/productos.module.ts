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

@Module({
  imports: [TypeOrmModule.forFeature([Producto, CategoriaProducto])],
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
