import { DataSource } from 'typeorm';
import { Producto } from '../../productos/productosEntities/producto.entity';
import { CategoriaProducto } from '../../productos/productosEntities/categoriaProducto.entity';

export async function productoSeed(dataSource: DataSource) {
  const productoRepo = dataSource.getRepository(Producto);
  const categoriaRepo = dataSource.getRepository(CategoriaProducto);

  // Traer subcategorías necesarias
  const sopa = await categoriaRepo.findOne({ where: { nombre: 'Sopa' } });
  const cafeSub = await categoriaRepo.findOne({ where: { nombre: 'Cafe' } });

  if (!sopa || !cafeSub) {
    console.log('❌ Las subcategorías necesarias no están creadas.');
    return;
  }

  const productos = [
    {
      nombre: 'Sopa de Arroz',
      descripcion: 'Deliciosa sopa tradicional con arroz y verduras',
      precio: 10,
      disponibilidad: 10,
      categoria: sopa,
      activo: true,
      imagen: '/uploads/productos/sopaArroz.jfif',
    },
    {
      nombre: 'Audífonos Bluetooth Sony',
      descripcion: 'Sonido HD con cancelación de ruido',
      precio: 199.99,
      disponibilidad: 15,
      categoria: cafeSub,
      activo: true,
      imagen: '/productos/audifonos-sony.jpg',
    },
    {
      nombre: 'Juego de Sartenes Antiadherentes',
      descripcion: 'Set de cocina completo de 5 piezas',
      precio: 89.99,
      disponibilidad: 15,
      categoria: sopa.parent, // ejemplo: categoría principal "Menu"
      activo: true,
      imagen: '/productos/sartenes.jpg',
    },
  ];

  for (const prod of productos) {
    const existe = await productoRepo.findOne({
      where: { nombre: prod.nombre },
    });
    if (!existe) {
      await productoRepo.save(productoRepo.create(prod));
    }
  }

  console.log('✔ Productos creados correctamente con subcategorías');
}
