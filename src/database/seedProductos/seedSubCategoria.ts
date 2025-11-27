import { DataSource } from 'typeorm';
import { CategoriaProducto } from '../../productos/productosEntities/categoriaProducto.entity';
import { SubcategoriaProducto } from '../../productos/productosEntities/subcategoriaProductos.entity';

export async function subcategoriaSeed(dataSource: DataSource) {
  const categoriaRepo = dataSource.getRepository(CategoriaProducto);
  const subcategoriaRepo = dataSource.getRepository(SubcategoriaProducto);

  const menu = await categoriaRepo.findOne({ where: { nombre: 'Menu' } });
  const cafe = await categoriaRepo.findOne({ where: { nombre: 'Cafe' } });

  if (!menu || !cafe) {
    console.log('Las categorías principales no están creadas.');
    return;
  }

  const subcategorias = [
    { nombre: 'Entrada', descripcion: '', categoria: menu },
    { nombre: 'Sopa', descripcion: '', categoria: menu },
    { nombre: 'Segundo', descripcion: '', categoria: menu },

    { nombre: 'Cafe', descripcion: '', categoria: cafe },
    { nombre: 'Postres', descripcion: '', categoria: cafe },
    { nombre: 'Acompañamiento', descripcion: '', categoria: cafe },
  ];

  for (const sub of subcategorias) {
    const existe = await subcategoriaRepo.findOne({
      where: { nombre: sub.nombre },
    });

    if (!existe) {
      await subcategoriaRepo.save(
        subcategoriaRepo.create({
          nombre: sub.nombre,
          descripcion: sub.descripcion,
          categoria: sub.categoria,
          activo: true,
        }),
      );
    }
  }

  console.log('Subcategorías creadas correctamente');
}
