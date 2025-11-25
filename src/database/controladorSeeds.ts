import { DataSource } from 'typeorm';
import { seedUsuarios } from './seedUsuarios/seedUsuario';
import { seedRoles } from './seedUsuarios/seedRol';
import { seedRolUsuario } from './seedUsuarios/seedRolUsuario';

import { categoriaProductoSeed } from './seedProductos/seedCategorias';
import { productoSeed } from './seedProductos/seedProductos';
export async function runSeeds(dataSource: DataSource) {
  console.log('Ejecutando seeds...');

  await seedRoles(dataSource);
  await seedUsuarios(dataSource);
  await seedRolUsuario(dataSource);

  await categoriaProductoSeed(dataSource);
  await productoSeed(dataSource);
  console.log('Todas las seeds ejecutadas!');
}
