import { Injectable } from '@angular/core';
import { HttpVeaService } from '../http-vea.service';
import { Menu } from '../../modelos/menu';
import { Pedido } from '../../modelos/pedido';

@Injectable()
export class CocinaService {

  constructor(
    private http: HttpVeaService
  ) { }

  verMenus() {
    return this.http.get('/cocina/menus').map(response => response['datos']);
  }

  crearMenu(nuevoMenu: Menu) {
    return this.http.post('/cocina/menus', nuevoMenu).map(response => response['id']);
  }

  verIngredientes() {
    return this.http.get('/cocina/ingredientes').map(response => response['datos']);
  }

  verMenu(menuId: number) {
    return this.http.get('/cocina/menus/' + menuId).map(response => response['datos']);
  }

  agregarIngredienteMenu(menuId: number, ingredienteId: number, cantidad: number) {
    const cuerpo = {
      id_producto: ingredienteId,
      cantidad: cantidad
    };
    return this.http.put('/cocina/menus/agregar/' + menuId, cuerpo);
  }

  verIngredientesMenu(menuId: number) {
    return this.http.get('/cocina/ingredientes/' + menuId).map(response => response['datos']);
  }

  verPedidosPendientes() {
    return this.http.get('/cocina/pedidos-pendientes').map(response => response['datos']);
  }

  verPedidosCerrados() {
    return this.http.get('/cocina/pedidos-cerrados').map(response => response['datos']);
  }

  verPedido(pedidoId: number) {
    return this.http.get('/cocina/pedidos/' + pedidoId).map(response => response['datos']);
  }

  crearPedido(pedido: Pedido) {
    return this.http.post('/cocina/pedidos', pedido).map(response => response['id']);
  }

  verAdicionales() {
    return this.http.get('/cocina/pedidos/adicionales').map(response => response['datos']);
  }

  verMenusPedido(pedidoId: number) {
    return this.http.get('/cocina/pedidos/menus/' + pedidoId).map(response => response['datos']);
  }

  agregarMenuPedido(pedidoId: number, menu: Menu, observaciones: string) {
    const body = {
      id_menu: menu.id,
      observaciones: observaciones
    };
    return this.http.put('/cocina/pedidos/menus/' + pedidoId, body).map(response => response['id']);
  }

  agregarAdicionalMenuPedido(menuPedidoId: number, adicionalId: number) {
    const body = {
      id_producto: adicionalId
    };
    return this.http.put('/cocina/pedidos/adicionales/' + menuPedidoId, body).map(response => response['id']);
  }

}
