import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Traduccion } from './entities/traduccion.entity';
import { TraduccionRepository } from './repositories/traduccion.repository';
import { TraduccionService } from './services/traduccion.service';
import { TraduccionController } from './controllers/traduccion.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Traduccion])],
  controllers: [TraduccionController],
  providers: [TraduccionRepository, TraduccionService],
  exports: [TraduccionService, TraduccionRepository],
})
export class TraduccionesModule {}
