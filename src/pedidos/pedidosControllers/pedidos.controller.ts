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

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async crear(@Body() dto: CrearPedidoDto) {
    const pedido = await this.pedidosService.crear(dto);
    return {
      mensaje: 'Pedido creado exitosamente',
      datos: pedido,
    };
  }

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

  @Get('estadisticas')
  async obtenerEstadisticas() {
    const estadisticas = await this.pedidosService.obtenerEstadisticas();
    return {
      mensaje: 'Estadísticas obtenidas exitosamente',
      datos: estadisticas,
    };
  }

  @Get('usuario/:usuarioId')
  async buscarPorUsuario(@Param('usuarioId', ParseIntPipe) usuarioId: number) {
    const pedidos = await this.pedidosService.buscarPorUsuario(usuarioId);
    return {
      mensaje: 'Pedidos del usuario obtenidos exitosamente',
      datos: pedidos,
      total: pedidos.length,
    };
  }

  @Get('numero/:numeroPedido')
  async buscarPorNumeroPedido(@Param('numeroPedido') numeroPedido: string) {
    const pedido =
      await this.pedidosService.buscarPorNumeroPedido(numeroPedido);
    return {
      mensaje: 'Pedido encontrado',
      datos: pedido,
    };
  }

  @Get(':id')
  async buscarPorId(@Param('id', ParseIntPipe) id: number) {
    const pedido = await this.pedidosService.buscarPorId(id);
    return {
      mensaje: 'Pedido encontrado',
      datos: pedido,
    };
  }

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

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async eliminar(@Param('id', ParseIntPipe) id: number) {
    const pedido = await this.pedidosService.eliminar(id);
    return {
      mensaje: 'Pedido cancelado exitosamente',
      datos: pedido,
    };
  }
}
