// src/pedidos/pedidosControllers/pedidos.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { PedidosService } from '../pedidosServices/pedidos.service';
import { CrearPedidoDto } from '../dto/createPedido.dto';
import { ActualizarPedidoDto } from '../dto/actualizarPedido.dto';
import { EstadoPedido } from '../pedidosEntities/pedidos.entity';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  /**
   * POST /pedidos
   * Crear un nuevo pedido
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async crear(@Body() dto: CrearPedidoDto) {
    const pedido = await this.pedidosService.crear(dto);
    return {
      mensaje: 'Pedido creado exitosamente',
      datos: pedido,
    };
  }

  /**
   * GET /pedidos
   * Listar pedidos con filtros opcionales
   */
  @Get()
  async buscarTodos(
    @Query('estado') estado?: EstadoPedido,
    @Query('usuarioId', new ParseIntPipe({ optional: true }))
    usuarioId?: number,
    @Query('fechaInicio') fechaInicio?: string,
    @Query('fechaFin') fechaFin?: string,
    @Query('pagina', new ParseIntPipe({ optional: true })) pagina: number = 1,
    @Query('limite', new ParseIntPipe({ optional: true })) limite: number = 10,
  ) {
    const resultado = await this.pedidosService.buscarTodos(
      estado,
      usuarioId,
      fechaInicio ? new Date(fechaInicio) : undefined,
      fechaFin ? new Date(fechaFin) : undefined,
      pagina,
      limite,
    );

    return {
      mensaje: 'Pedidos obtenidos exitosamente',
      ...resultado,
    };
  }

  /**
   * GET /pedidos/estadisticas
   * Obtener estadísticas generales de pedidos
   */
  @Get('estadisticas')
  async obtenerEstadisticas() {
    const estadisticas = await this.pedidosService.obtenerEstadisticas();
    return {
      mensaje: 'Estadísticas obtenidas exitosamente',
      datos: estadisticas,
    };
  }

  /**
   * GET /pedidos/usuario/:usuarioId
   * Obtener todos los pedidos de un usuario específico
   */
  @Get('usuario/:usuarioId')
  async buscarPorUsuario(@Param('usuarioId', ParseIntPipe) usuarioId: number) {
    const pedidos = await this.pedidosService.buscarPorUsuario(usuarioId);
    return {
      mensaje: 'Pedidos del usuario obtenidos exitosamente',
      datos: pedidos,
      total: pedidos.length,
    };
  }

  /**
   * GET /pedidos/numero/:numeroPedido
   * Buscar un pedido por su número único
   */
  @Get('numero/:numeroPedido')
  async buscarPorNumeroPedido(@Param('numeroPedido') numeroPedido: string) {
    const pedido =
      await this.pedidosService.buscarPorNumeroPedido(numeroPedido);
    return {
      mensaje: 'Pedido encontrado',
      datos: pedido,
    };
  }

  /**
   * GET /pedidos/:id
   * Buscar un pedido por su ID
   */
  @Get(':id')
  async buscarPorId(@Param('id', ParseIntPipe) id: number) {
    const pedido = await this.pedidosService.buscarPorId(id);
    return {
      mensaje: 'Pedido encontrado',
      datos: pedido,
    };
  }

  /**
   * PATCH /pedidos/:id
   * Actualizar un pedido (estado y/o notas)
   */
  @Patch(':id')
  async actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ActualizarPedidoDto,
  ) {
    const pedido = await this.pedidosService.actualizar(id, dto);
    return {
      mensaje: 'Pedido actualizado exitosamente',
      datos: pedido,
    };
  }

  /**
   * DELETE /pedidos/:id
   * Eliminar un pedido (solo si no está completado)
   */
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async eliminar(@Param('id', ParseIntPipe) id: number) {
    await this.pedidosService.eliminar(id);
    return {
      mensaje: 'Pedido eliminado exitosamente',
    };
  }
}
