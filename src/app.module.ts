// backend_nest/src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from '../ormconfig';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { UsuariosModule } from './usuarios/usuarios.module';
import { ProductosModule } from './productos/productos.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { AuthModule } from './usuarios/auth.module';
import { TraduccionesModule } from './traducciones/traducciones.module';
import { IdiomaInterceptor } from './comun/interceptors/idioma.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      ...AppDataSource.options,
    }),

    UsuariosModule,
    AuthModule,
    ProductosModule,
    PedidosModule,
    TraduccionesModule,
  ],
  providers: [
    // ✅ REGISTRAR IdiomaInterceptor GLOBALMENTE
    {
      provide: APP_INTERCEPTOR,
      useClass: IdiomaInterceptor,
    },
  ],
})
export class AppModule {}
