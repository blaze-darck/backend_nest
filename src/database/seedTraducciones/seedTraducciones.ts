// src/database/seedTraducciones/seedTraducciones.ts
import { DataSource } from 'typeorm';
import {
  Traduccion,
  TipoEntidad,
  Idioma,
  CampoTraducible,
} from '../../traducciones/entities/traduccion.entity';

// 🌐 Traducciones de CATEGORÍAS
const traduccionesCategorias = [
  // --- Categoría 1: Menu ---
  {
    entidad: TipoEntidad.CATEGORIA,
    entidadId: 1,
    idioma: Idioma.EN,
    campo: CampoTraducible.NOMBRE,
    valor: 'Menu',
  },
  {
    entidad: TipoEntidad.CATEGORIA,
    entidadId: 1,
    idioma: Idioma.EN,
    campo: CampoTraducible.DESCRIPCION,
    valor: 'Lunch dishes',
  },
  {
    entidad: TipoEntidad.CATEGORIA,
    entidadId: 1,
    idioma: Idioma.AY,
    campo: CampoTraducible.NOMBRE,
    valor: "Manq'aña",
  },
  {
    entidad: TipoEntidad.CATEGORIA,
    entidadId: 1,
    idioma: Idioma.AY,
    campo: CampoTraducible.DESCRIPCION,
    valor: "Chika uru manq'añataki",
  },

  // --- Categoría 2: Cafe ---
  {
    entidad: TipoEntidad.CATEGORIA,
    entidadId: 2,
    idioma: Idioma.EN,
    campo: CampoTraducible.NOMBRE,
    valor: 'Cafe',
  },
  {
    entidad: TipoEntidad.CATEGORIA,
    entidadId: 2,
    idioma: Idioma.EN,
    campo: CampoTraducible.DESCRIPCION,
    valor: 'Tea time products',
  },
  {
    entidad: TipoEntidad.CATEGORIA,
    entidadId: 2,
    idioma: Idioma.AY,
    campo: CampoTraducible.NOMBRE,
    valor: 'Café',
  },
  {
    entidad: TipoEntidad.CATEGORIA,
    entidadId: 2,
    idioma: Idioma.AY,
    campo: CampoTraducible.DESCRIPCION,
    valor: 'Té umanañataki yänakanaka',
  },
];

// 🌐 Traducciones de SUBCATEGORÍAS
const traduccionesSubcategorias = [
  // --- Subcategoría 1: Entrada ---
  {
    entidad: TipoEntidad.SUBCATEGORIA,
    entidadId: 1,
    idioma: Idioma.EN,
    campo: CampoTraducible.NOMBRE,
    valor: 'Appetizer',
  },
  {
    entidad: TipoEntidad.SUBCATEGORIA,
    entidadId: 1,
    idioma: Idioma.AY,
    campo: CampoTraducible.NOMBRE,
    valor: "Qallta manq'a",
  },

  // --- Subcategoría 2: Sopa ---
  {
    entidad: TipoEntidad.SUBCATEGORIA,
    entidadId: 2,
    idioma: Idioma.EN,
    campo: CampoTraducible.NOMBRE,
    valor: 'Soup',
  },
  {
    entidad: TipoEntidad.SUBCATEGORIA,
    entidadId: 2,
    idioma: Idioma.AY,
    campo: CampoTraducible.NOMBRE,
    valor: 'Chuwa',
  },

  // --- Subcategoría 3: Segundo ---
  {
    entidad: TipoEntidad.SUBCATEGORIA,
    entidadId: 3,
    idioma: Idioma.EN,
    campo: CampoTraducible.NOMBRE,
    valor: 'Main Course',
  },
  {
    entidad: TipoEntidad.SUBCATEGORIA,
    entidadId: 3,
    idioma: Idioma.AY,
    campo: CampoTraducible.NOMBRE,
    valor: "Jach'a manq'a",
  },

  // --- Subcategoría 4: Cafe ---
  {
    entidad: TipoEntidad.SUBCATEGORIA,
    entidadId: 4,
    idioma: Idioma.EN,
    campo: CampoTraducible.NOMBRE,
    valor: 'Coffee',
  },
  {
    entidad: TipoEntidad.SUBCATEGORIA,
    entidadId: 4,
    idioma: Idioma.AY,
    campo: CampoTraducible.NOMBRE,
    valor: 'Café',
  },

  // --- Subcategoría 5: Postres ---
  {
    entidad: TipoEntidad.SUBCATEGORIA,
    entidadId: 5,
    idioma: Idioma.EN,
    campo: CampoTraducible.NOMBRE,
    valor: 'Desserts',
  },
  {
    entidad: TipoEntidad.SUBCATEGORIA,
    entidadId: 5,
    idioma: Idioma.AY,
    campo: CampoTraducible.NOMBRE,
    valor: "Muxsa manq'anaka",
  },

  // --- Subcategoría 6: Acompañamiento ---
  {
    entidad: TipoEntidad.SUBCATEGORIA,
    entidadId: 6,
    idioma: Idioma.EN,
    campo: CampoTraducible.NOMBRE,
    valor: 'Side Dish',
  },
  {
    entidad: TipoEntidad.SUBCATEGORIA,
    entidadId: 6,
    idioma: Idioma.AY,
    campo: CampoTraducible.NOMBRE,
    valor: "Jak'añ manq'a",
  },
];

// 🌐 Traducciones de PRODUCTOS
const traduccionesProductos = [
  // --- Producto 1: Sopa de Arroz ---
  {
    entidad: TipoEntidad.PRODUCTO,
    entidadId: 1,
    idioma: Idioma.EN,
    campo: CampoTraducible.NOMBRE,
    valor: 'Rice Soup',
  },

  {
    entidad: TipoEntidad.PRODUCTO,
    entidadId: 1,
    idioma: Idioma.EN,
    campo: CampoTraducible.DESCRIPCION,
    valor:
      'A warm and comforting rice soup made with soft rice grains, aromatic vegetables, and a flavorful broth. Perfect as a light starter or a nourishing meal.',
  },

  {
    entidad: TipoEntidad.PRODUCTO,
    entidadId: 1,
    idioma: Idioma.AY,
    campo: CampoTraducible.NOMBRE,
    valor: 'Arroz chuwa',
  },

  {
    entidad: TipoEntidad.PRODUCTO,
    entidadId: 1,
    idioma: Idioma.AY,
    campo: CampoTraducible.DESCRIPCION,
    valor:
      'Arroz sopaxa mä suma manq’awa, arroz grano t’ijuta, lawanakampi ukat suma caldo manq’añampi wakichata. Manq’añ qalltañataki jan ukax suma ch’ama churañataki wali askiwa.',
  },

  // --- Producto 2: Milanesa de carne ---
  {
    entidad: TipoEntidad.PRODUCTO,
    entidadId: 2,
    idioma: Idioma.EN,
    campo: CampoTraducible.NOMBRE,
    valor: 'Beef Milanesa',
  },

  {
    entidad: TipoEntidad.PRODUCTO,
    entidadId: 2,
    idioma: Idioma.EN,
    campo: CampoTraducible.DESCRIPCION,
    valor:
      'A crispy breaded beef cutlet, seasoned and fried to golden perfection. Served with fries, salad, or rice for a delicious and satisfying meal.',
  },
  {
    entidad: TipoEntidad.PRODUCTO,
    entidadId: 2,
    idioma: Idioma.AY,
    campo: CampoTraducible.NOMBRE,
    valor: 'Aycha milanesa',
  },

  {
    entidad: TipoEntidad.PRODUCTO,
    entidadId: 2,
    idioma: Idioma.AY,
    campo: CampoTraducible.DESCRIPCION,
    valor:
      'Aycha milanesa mä suma aycha t’ant’ampi imata ukat q’illi t’anti suma ch’ama manq’añataki phayatawa. Papas fritas, ensalada jan ukax arrozampi manq’asiña wali suma manq’awa.',
  },

  // --- Producto 3: Cafe con leche ---
  {
    entidad: TipoEntidad.PRODUCTO,
    entidadId: 3,
    idioma: Idioma.EN,
    campo: CampoTraducible.NOMBRE,
    valor: 'Coffee with Milk',
  },

  {
    entidad: TipoEntidad.PRODUCTO,
    entidadId: 3,
    idioma: Idioma.EN,
    campo: CampoTraducible.DESCRIPCION,
    valor:
      'A smooth and comforting drink made with freshly brewed coffee and warm milk, perfect for breakfast or a relaxing break.',
  },

  {
    entidad: TipoEntidad.PRODUCTO,
    entidadId: 3,
    idioma: Idioma.AY,
    campo: CampoTraducible.NOMBRE,
    valor: 'Café leche ukampi',
  },

  {
    entidad: TipoEntidad.PRODUCTO,
    entidadId: 3,
    idioma: Idioma.AY,
    campo: CampoTraducible.DESCRIPCION,
    valor:
      'Kafi lecheampi mä suma umaña manq’awa, kafi ch’uquta ukat junt’u leche ukampix wakichata. Almuersu qalltañataki jan ukax samarañataki wali askiwa.',
  },
];

// 📦 Combinar todas las traducciones
const todasLasTraducciones = [
  ...traduccionesCategorias,
  ...traduccionesSubcategorias,
  ...traduccionesProductos,
];

export async function seedTraducciones(dataSource: DataSource) {
  const traduccionRepo = dataSource.getRepository(Traduccion);

  console.log('🌐 Iniciando seed de traducciones...');

  // 1. Verificar si ya existen traducciones
  const count = await traduccionRepo.count();

  if (count > 0) {
    console.log(`✅ Ya existen ${count} traducciones, saltando seed.`);
    return;
  }

  // 2. Insertar todas las traducciones
  try {
    let insertadas = 0;

    for (const traduccionData of todasLasTraducciones) {
      // Verificar si ya existe esta traducción específica
      const existe = await traduccionRepo.findOne({
        where: {
          entidad: traduccionData.entidad,
          entidadId: traduccionData.entidadId,
          idioma: traduccionData.idioma,
          campo: traduccionData.campo,
        },
      });

      if (!existe) {
        const nuevaTraduccion = traduccionRepo.create(traduccionData);
        await traduccionRepo.save(nuevaTraduccion);
        insertadas++;
      }
    }

    console.log(
      `✅ Seed de traducciones completado: ${insertadas} traducciones insertadas.`,
    );
    console.log(`   📦 2 categorías traducidas (Menu, Cafe)`);
    console.log(`   📦 6 subcategorías traducidas`);
    console.log(`   📦 3 productos traducidos`);
    console.log(`   🌍 Idiomas: Español (original), English, Aymara`);
  } catch (error) {
    console.error('❌ Error al insertar traducciones:', error);
    throw error;
  }
}
