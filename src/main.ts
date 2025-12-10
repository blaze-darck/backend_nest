// backend_nest/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { runSeeds } from '../src/database/controladorSeeds';
import { DataSource } from 'typeorm';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads/',
  });

  // ✅ CORS CONFIGURADO CORRECTAMENTE
  app.enableCors({
    origin: ['http://localhost:5174', 'http://localhost:5173'],
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'x-app-language', // ← AGREGADO: Header personalizado de idioma
      'Accept',
      'Accept-Language',
    ],
    credentials: true,
  });

  const dataSource = app.get(DataSource);

  try {
    console.log('Ejecutando seeds...');
    await runSeeds(dataSource);
    console.log('Seeds ejecutadas correctamente!');
  } catch (error) {
    console.error('Error ejecutando seeds:', error);
  }

  await app.listen(3000);
  console.log('✅ Servidor corriendo en http://localhost:3000');
  console.log('✅ CORS habilitado con header x-app-language');
}

bootstrap();
