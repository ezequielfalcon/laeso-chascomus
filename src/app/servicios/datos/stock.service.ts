import { Injectable } from '@angular/core';
import {HttpVeaService} from '../http-vea.service';
import {Producto} from '../../modelos/producto';

@Injectable()
export class StockService {

  constructor(
    private http: HttpVeaService
  ) { }

  verRemitos() {
    return this.http.get('/stock/remitos');
  }

  verRemitosParaCarga(remitoId: number) {
    return this.http.get('/stock/remitos/' + remitoId).map(response => response['datos']);
  }

  verHistorialRemito(remitoId: number) {
    return this.http.get('/stock/remitos/historial/' + remitoId).map(response => response['datos']);
  }

  verProductosPorRemito(remitoId: number) {
    return this.http.get('/stock/remitos/productos/' + remitoId).map(response => response['datos']);
  }

  nuevoRemitoRecibido(proveedorId: number, numero: string, obs: string) {
    const body = {
      id_proveedor: proveedorId,
      numero: numero,
      observaciones: obs
    };
    return this.http.post('/stock/remitos', body);
  }

  agregarProductoRemito(remitoId: number, producto: Producto) {
    const body = {
      id_remito: remitoId,
      id_producto: producto.id_producto,
      cantidad: producto.cantidad,
      costo: producto.costo,
      fecha_vencimiento: producto.fecha_vencimiento,
      iva: producto.iva_incluido
    };
    return this.http.post('/stock/remitos/productos', body);
  }

  quitarProductoRemito(remitoId: number, productoId: number) {
    return this.http.del('/stock/remitos/productos/' + remitoId + '/' + productoId);
  }

  confirmarRemito(remitoId: number) {
    return this.http.put('/stock/remitos/' + remitoId, new URLSearchParams());
  }

  cerrarRemito(remitoId: number) {
    return this.http.put('/stock/remitos/cerrar/' + remitoId, new URLSearchParams());
  }

  borrarRemito(remitoId: number) {
    return this.http.del('/stock/remitos/' + remitoId);
  }

  verProductosStock() {
    return this.http.get('/stock').map(response => response['datos']);
  }

  verAjustesStock() {
    return this.http.get('/stock/ajustes').map(response => response['datos']);
  }

  nuevoAjuste(idProducto: number, cantidad: number, motivo: string) {
    const body = {
      id_producto: idProducto,
      cantidad: cantidad,
      motivo: motivo
    };
    return this.http.post('/stock/ajuste-unico', body);
  }

}
