import { Module } from '@nestjs/common';
import { ProductosService } from './productoService/productos.service';
import { ProductosController } from './productoControllers/productos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './productosEntities/producto.entity';
import { CategoriaProducto } from './productosEntities/categoriaProducto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Producto, CategoriaProducto])],
  controllers: [ProductosController],
  providers: [ProductosService],
})
export class ProductosModule {}
