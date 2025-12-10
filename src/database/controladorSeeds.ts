// backend_nest/src/database/controladorSeeds.ts
import { DataSource } from 'typeorm';
import { seedUsuarios } from './seedUsuarios/seedUsuario';
import { seedRoles } from './seedUsuarios/seedRol';
import { seedRolUsuario } from './seedUsuarios/seedRolUsuario';

import { categoriaSeed } from './seedProductos/seedCategorias';
import { productoSeed } from './seedProductos/seedProductos';
import { subcategoriaSeed } from './seedProductos/seedSubCategoria';
import { seedTraducciones } from './seedTraducciones/seedTraducciones';

export async function runSeeds(dataSource: DataSource) {
  console.log('🌱 Ejecutando seeds...');

  // 1. Seeds de usuarios y roles
  await seedRoles(dataSource);
  await seedUsuarios(dataSource);
  await seedRolUsuario(dataSource);

  // 2. Seeds de productos
  await categoriaSeed(dataSource);
  await subcategoriaSeed(dataSource);
  await productoSeed(dataSource);

  // 3. Seeds de traducciones (ACTIVADO)
  await seedTraducciones(dataSource);

  console.log('✅ Todas las seeds ejecutadas correctamente!');
}
