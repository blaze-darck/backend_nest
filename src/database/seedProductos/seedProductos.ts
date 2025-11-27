import { DataSource } from 'typeorm';
import { Producto } from '../../productos/productosEntities/producto.entity';
import { SubcategoriaProducto } from '../../productos/productosEntities/subcategoriaProductos.entity';

export async function productoSeed(dataSource: DataSource) {
  const productoRepo = dataSource.getRepository(Producto);
  const subcategoriaRepo = dataSource.getRepository(SubcategoriaProducto);

  // Buscar subcategorías necesarias
  const sopa = await subcategoriaRepo.findOne({ where: { nombre: 'Sopa' } });
  const cafeSub = await subcategoriaRepo.findOne({ where: { nombre: 'Cafe' } });
  const segundo = await subcategoriaRepo.findOne({where:{ nombre: 'Segundo'}})

  if (!sopa || !segundo || !cafeSub) {
  console.log('Las subcategorías necesarias no están creadas.');
  return;
}

  const productos = [
    {
      nombre: 'Sopa de Arroz',
      descripcion: 'Deliciosa sopa tradicional con arroz y verduras',
      precio: 10,
      disponibilidad: 50,
      subcategoria: sopa,
      activo: true,
      imagen: '/uploads/productos/sopaArroz.jfif',
    },
    {
      nombre: 'Milanesa de carne',
      descripcion: 'Milanesa echa con amor acompañado de arroz o fideo con una rica ensalada',
      precio: 15,
      disponibilidad: 50,
      subcategoria: segundo,
      activo: true,
      imagen: '/uploads/productos/milanesa.jfif',
    },
    {
      nombre: 'Cafe con leche',
      descripcion: 'El mas exclusivo cafe con leche de toda la ciudad',
      precio:12,
      disponibilidad: 30,
      subcategoria: cafeSub, 
      activo: true,
      imagen: '/uploads/productos/cafe_leche.jfif',
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

  console.log('✔ Productos creados correctamente');
}

