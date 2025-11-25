import { DataSource } from 'typeorm';
import { CategoriaProducto } from '../../productos/productosEntities/categoriaProducto.entity';

export async function categoriaSeed(dataSource: DataSource) {
  const repo = dataSource.getRepository(CategoriaProducto);

  // Categorías principales
  const categorias = [
    { nombre: 'Menu', descripcion: 'Platos para el almuerzo', activo: true },
    { nombre: 'Cafe', descripcion: 'Productos para la hora del té', activo: true },
  ];

  for (const cat of categorias) {
    const existe = await repo.findOne({ where: { nombre: cat.nombre } });
    if (!existe) {
      await repo.save(repo.create(cat));
    }
  }

  console.log('✔ Categorías creadas correctamente');
}
