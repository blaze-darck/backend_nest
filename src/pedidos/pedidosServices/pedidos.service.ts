// src/pedidos/pedidosServices/pedidos.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PedidosRepository } from '../pedidosRepositories/pedido.repository';
import { Pedido, EstadoPedido } from '../pedidosEntities/pedidos.entity';
import { DetallePedido } from '../pedidosEntities/detallePedido.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Producto } from '../../productos/productosEntities/producto.entity';
import { CrearPedidoDto } from '../dto/createPedido.dto';
import { ActualizarPedidoDto } from '../dto/actualizarPedido.dto';

@Injectable()
export class PedidosService {
  constructor(
    private readonly pedidosRepository: PedidosRepository,
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
    @InjectRepository(Producto)
    private readonly productosRepository: Repository<Producto>,
    @InjectRepository(DetallePedido)
    private readonly detallesRepository: Repository<DetallePedido>,
    private readonly dataSource: DataSource,
  ) {}

  // src/pedidos/pedidosServices/pedidos.service.ts
  async crear(dto: CrearPedidoDto): Promise<Pedido> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      console.log('=== INICIO CREACIÓN PEDIDO ===');
      console.log('DTO recibido:', JSON.stringify(dto, null, 2));

      console.log('1. Buscando usuario ID:', dto.usuarioId);
      const usuario = await this.usuariosRepository.findOne({
        where: { id: dto.usuarioId },
      });

      if (!usuario) {
        throw new NotFoundException(
          `Usuario con ID ${dto.usuarioId} no encontrado`,
        );
      }
      console.log('✓ Usuario encontrado:', usuario.id, usuario.nombre);

      let subtotal = 0;
      const detalles: DetallePedido[] = [];

      console.log('2. Procesando', dto.detalles.length, 'detalles');
      for (const detalleDto of dto.detalles) {
        console.log('  - Buscando producto ID:', detalleDto.productoId);
        const producto = await this.productosRepository.findOne({
          where: { id: detalleDto.productoId },
        });

        if (!producto) {
          throw new NotFoundException(
            `Producto con ID ${detalleDto.productoId} no encontrado`,
          );
        }
        console.log(
          '  ✓ Producto encontrado:',
          producto.id,
          producto.nombre,
          'Precio:',
          producto.precio,
        );

        const detalle = new DetallePedido();
        detalle.producto = producto;
        detalle.cantidad = detalleDto.cantidad;
        detalle.precioUnitario = Number(producto.precio);
        detalle.subtotal = Number(producto.precio) * detalleDto.cantidad;

        console.log(
          '  ✓ Detalle creado - Cantidad:',
          detalle.cantidad,
          'Subtotal:',
          detalle.subtotal,
        );

        subtotal += detalle.subtotal;
        detalles.push(detalle);
      }
      console.log('✓ Subtotal total:', subtotal);

      console.log('3. Generando número de pedido...');
      const numeroPedido = await this.generarNumeroPedido();
      console.log('✓ Número generado:', numeroPedido);

      console.log('4. Creando objeto Pedido...');
      const pedido = new Pedido();
      pedido.numeroPedido = numeroPedido;
      pedido.cliente = usuario;
      pedido.metodoPago = dto.metodoPago;
      pedido.tipoEntrega = dto.tipoEntrega;
      pedido.notas = dto.notas ?? null;
      pedido.estado = EstadoPedido.PENDIENTE;
      pedido.subtotal = subtotal;
      pedido.total = subtotal;
      pedido.detalles = detalles;

      console.log('✓ Objeto pedido creado:', {
        numeroPedido: pedido.numeroPedido,
        clienteId: pedido.cliente.id,
        metodoPago: pedido.metodoPago,
        tipoEntrega: pedido.tipoEntrega,
        estado: pedido.estado,
        subtotal: pedido.subtotal,
        total: pedido.total,
        detallesCount: pedido.detalles.length,
      });

      console.log('5. Guardando en base de datos...');
      const pedidoGuardado = await queryRunner.manager.save(Pedido, pedido);
      console.log('✓ Pedido guardado con ID:', pedidoGuardado.id);

      console.log('6. Haciendo commit...');
      await queryRunner.commitTransaction();
      console.log('✓ Commit exitoso');

      console.log('7. Buscando pedido completo...');
      const pedidoCompleto = await this.buscarPorId(pedidoGuardado.id);
      console.log('✓ Pedido completo recuperado');
      console.log('=== FIN CREACIÓN PEDIDO ===');

      return pedidoCompleto;
    } catch (error) {
      console.error('❌ ERROR EN CREACIÓN DE PEDIDO:');
      console.error('Tipo de error:', error.constructor.name);
      console.error('Mensaje:', error.message);
      console.error('Stack:', error.stack);

      await queryRunner.rollbackTransaction();

      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      throw new InternalServerErrorException('Error al crear el pedido');
    } finally {
      await queryRunner.release();
    }
  }

  async buscarTodos(
    estado?: EstadoPedido,
    usuarioId?: number,
    fechaInicio?: Date,
    fechaFin?: Date,
    pagina: number = 1,
    limite: number = 10,
  ) {
    return this.pedidosRepository.buscarConFiltros(
      estado,
      usuarioId,
      fechaInicio,
      fechaFin,
      pagina,
      limite,
    );
  }

  async buscarPorId(id: number): Promise<Pedido> {
    const pedido = await this.pedidosRepository.findOne({
      where: { id },
      relations: ['cliente', 'detalles', 'detalles.producto'],
    });

    if (!pedido) {
      throw new NotFoundException(`Pedido con ID ${id} no encontrado`);
    }

    return pedido;
  }

  async buscarPorNumeroPedido(numeroPedido: string): Promise<Pedido> {
    const pedido =
      await this.pedidosRepository.buscarPorNumeroPedido(numeroPedido);

    if (!pedido) {
      throw new NotFoundException(`Pedido ${numeroPedido} no encontrado`);
    }

    return pedido;
  }

  async buscarPorUsuario(usuarioId: number): Promise<Pedido[]> {
    return this.pedidosRepository.buscarPorUsuario(usuarioId);
  }

  // src/pedidos/pedidosServices/pedidos.service.ts
  async actualizar(id: number, dto: ActualizarPedidoDto): Promise<Pedido> {
    const pedido = await this.buscarPorId(id);

    if (dto.estado) {
      if (
        pedido.estado === EstadoPedido.COMPLETADO ||
        pedido.estado === EstadoPedido.CANCELADO
      ) {
        throw new BadRequestException(
          'No se puede modificar un pedido completado o cancelado',
        );
      }
      pedido.estado = dto.estado;
    }

    if (dto.notas !== undefined) {
      pedido.notas = dto.notas;
    }

    await this.pedidosRepository.save(pedido);

    return this.buscarPorId(id);
  }

  // ✅ CAMBIO: Ahora es un soft delete (cambio de estado a CANCELADO)
  async eliminar(id: number): Promise<Pedido> {
    const pedido = await this.buscarPorId(id);

    if (pedido.estado === EstadoPedido.COMPLETADO) {
      throw new BadRequestException(
        'No se puede cancelar un pedido completado',
      );
    }

    if (pedido.estado === EstadoPedido.CANCELADO) {
      throw new BadRequestException('El pedido ya está cancelado');
    }

    // Cambiamos el estado a CANCELADO en lugar de eliminarlo
    pedido.estado = EstadoPedido.CANCELADO;
    await this.pedidosRepository.save(pedido);

    return pedido;
  }

  async obtenerEstadisticas() {
    const total = await this.pedidosRepository.count();
    const enPreparacion = await this.pedidosRepository.contarPorEstado(
      EstadoPedido.PENDIENTE,
    );
    const completados = await this.pedidosRepository.contarPorEstado(
      EstadoPedido.COMPLETADO,
    );
    const cancelados = await this.pedidosRepository.contarPorEstado(
      EstadoPedido.CANCELADO,
    );
    const totalVentas = await this.pedidosRepository.obtenerTotalVentas();

    return {
      total,
      enPreparacion,
      completados,
      cancelados,
      totalVentas,
    };
  }

  private async generarNumeroPedido(): Promise<string> {
    const fecha = new Date();
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');

    const ultimoPedido = await this.pedidosRepository.obtenerUltimoPedido();
    const secuencia = ultimoPedido ? ultimoPedido.id + 1 : 1;

    return `PED-${año}${mes}${dia}-${String(secuencia).padStart(6, '0')}`;
  }
}
