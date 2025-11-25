import { DataSource } from 'typeorm';
import { CategoriaProducto } from '../../productos/productosEntities/categoriaProducto.entity';

export async function categoriaProductoSeed(dataSource: DataSource) {
  const repo = dataSource.getRepository(CategoriaProducto);

  // Categorías principales
  const baseCategorias = [
    { nombre: 'Menu', descripcion: 'Platos para el almuerzo', activo: true },
    {
      nombre: 'Cafe',
      descripcion: 'Productos para la hora del té',
      activo: true,
    },
  ];

  const savedBases: CategoriaProducto[] = [];
  for (const cat of baseCategorias) {
    let existe = await repo.findOne({ where: { nombre: cat.nombre } });
    if (!existe) {
      existe = await repo.save(repo.create(cat));
    }
    savedBases.push(existe);
  }

  // Subcategorías
  const subCategorias = [
    { nombre: 'Entrada', parent: savedBases[0] },
    { nombre: 'Sopa', parent: savedBases[0] },
    { nombre: 'Segundo', parent: savedBases[0] },
    { nombre: 'Cafe', parent: savedBases[1] },
    { nombre: 'Postres', parent: savedBases[1] },
    { nombre: 'Acompañamiento', parent: savedBases[1] },
  ];

  for (const sub of subCategorias) {
    let existe = await repo.findOne({ where: { nombre: sub.nombre } });
    if (!existe) {
      await repo.save(
        repo.create({
          nombre: sub.nombre,
          descripcion: '',
          activo: true,
          parent: sub.parent,
        }),
      );
    }
  }

  console.log('✔ Categorías y subcategorías creadas correctamente');
}
