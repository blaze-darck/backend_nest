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

  async crear(dto: CrearPedidoDto): Promise<Pedido> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const usuario = await this.usuariosRepository.findOne({
        where: { id: dto.usuarioId },
      });

      if (!usuario) {
        throw new NotFoundException(
          `Usuario con ID ${dto.usuarioId} no encontrado`,
        );
      }

      // ❌ ELIMINA ESTAS LÍNEAS 46-47 (están duplicadas)
      // const pedido = new Pedido();
      // pedido.usuario = usuario;

      let subtotal = 0;
      const detalles: DetallePedido[] = [];

      for (const detalleDto of dto.detalles) {
        const producto = await this.productosRepository.findOne({
          where: { id: detalleDto.productoId },
        });

        if (!producto) {
          throw new NotFoundException(
            `Producto con ID ${detalleDto.productoId} no encontrado`,
          );
        }

        const detalle = new DetallePedido();
        detalle.producto = producto;
        detalle.cantidad = detalleDto.cantidad;
        detalle.precioUnitario = Number(producto.precio);
        detalle.subtotal = Number(producto.precio) * detalleDto.cantidad;

        subtotal += detalle.subtotal;
        detalles.push(detalle);
      }

      // ✅ AGREGA ESTA LÍNEA: genera el número de pedido
      const numeroPedido = await this.generarNumeroPedido();

      // ✅ AHORA SÍ crea el pedido (línea 73)
      const pedido = new Pedido();
      pedido.numeroPedido = numeroPedido;
      pedido.cliente = usuario; // ✅ CAMBIO: 'usuario' → 'cliente'
      pedido.metodoPago = dto.metodoPago;
      pedido.notas = dto.notas ?? null;
      pedido.estado = EstadoPedido.PENDIENTE;
      pedido.subtotal = subtotal;
      pedido.total = subtotal;
      pedido.detalles = detalles;

      const pedidoGuardado = await queryRunner.manager.save(Pedido, pedido);

      await queryRunner.commitTransaction();

      return this.buscarPorId(pedidoGuardado.id);
    } catch (error) {
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
      relations: ['cliente', 'detalles', 'detalles.producto'], // ✅ CAMBIO: 'usuario' → 'cliente'
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

  async eliminar(id: number): Promise<void> {
    const pedido = await this.buscarPorId(id);

    if (pedido.estado === EstadoPedido.COMPLETADO) {
      throw new BadRequestException(
        'No se puede eliminar un pedido completado',
      );
    }

    await this.pedidosRepository.remove(pedido);
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
