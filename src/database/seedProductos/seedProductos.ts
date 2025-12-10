import { DataSource } from 'typeorm';
import { Producto } from '../../productos/productosEntities/producto.entity';
import { SubcategoriaProducto } from '../../productos/productosEntities/subcategoriaProductos.entity';

export async function productoSeed(dataSource: DataSource) {
  const productoRepo = dataSource.getRepository(Producto);
  const subcategoriaRepo = dataSource.getRepository(SubcategoriaProducto);

  // Buscar subcategorías necesarias
  const sopa = await subcategoriaRepo.findOne({ where: { nombre: 'Sopa' } });
  const cafeSub = await subcategoriaRepo.findOne({ where: { nombre: 'Cafe' } });
  const segundo = await subcategoriaRepo.findOne({
    where: { nombre: 'Segundo' },
  });

  if (!sopa || !segundo || !cafeSub) {
    console.log('Las subcategorías necesarias no están creadas.');
    return;
  }

  const productos = [
    {
      nombre: 'Sopa de Arroz',
      descripcion:
        'Una sopa caliente y reconfortante elaborada con arroz suave, verduras aromáticas y un caldo lleno de sabor. Ideal como entrada ligera o como comida nutritiva.',
      precio: 10,
      disponibilidad: 50,
      subcategoria: sopa,
      activo: true,
      imagen: '/uploads/productos/sopaArroz.jfif',
    },
    {
      nombre: 'Milanesa de carne',
      descripcion:
        'Crujiente filete de carne empanizado, sazonado y frito hasta quedar dorado y perfecto. Acompañado de papas fritas, ensalada o arroz para una comida deliciosa y satisfactoria.',
      precio: 15,
      disponibilidad: 50,
      subcategoria: segundo,
      activo: true,
      imagen: '/uploads/productos/milanesa.jfif',
    },
    {
      nombre: 'Cafe con leche',
      descripcion:
        'Bebida suave y reconfortante preparada con café recién hecho y leche caliente. Perfecta para el desayuno o una pausa relajante',
      precio: 12,
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
