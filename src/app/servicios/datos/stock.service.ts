import { Injectable } from '@angular/core';
import {HttpVeaService} from '../http-vea.service';
import {Response, URLSearchParams} from '@angular/http';
import {ProductoRemito} from '../../modelos/producto-remito';

@Injectable()
export class StockService {

  constructor(
    private http: HttpVeaService
  ) { }

  verRemitosRecibidos() {
    return this.http.get('/stock/remitos/recibidos').map((response: Response) => response.json().datos);
  }

  verRemitosEnCarga() {
    return this.http.get('/stock/remitos/en-carga').map((response: Response) => response.json().datos);
  }

  verRemitosParaCarga(remitoId: number) {
    return this.http.get('/stock/remitos/para-carga/' + remitoId).map((response: Response) => response.json().datos);
  }

  verHistorialRemito(remitoId: number) {
    return this.http.get('/stock/remitos/historial/' + remitoId).map((response: Response) => response.json().datos);
  }

  verProductosPorRemito(remitoId: number) {
    return this.http.get('/stock/remitos/productos/' + remitoId).map((response: Response) => response.json().datos);
  }

  nuevoRemitoRecibido(proveedorId: number, numero: string, obs: string) {
    const body = new URLSearchParams();
    body.set('id_proveedor', '' + proveedorId);
    body.set('numero', numero);
    body.set('observaciones', obs);
    return this.http.post('/stock/remitos/recibidos', body).map((response: Response) => response.json());
  }

  agregarProductoRemito(remitoId: number, producto: ProductoRemito) {
    const body = new URLSearchParams();
    body.set('id_remito', '' + remitoId);
    body.set('id_producto', '' + producto.id_producto);
    body.set('cantidad', '' + producto.cantidad);
    body.set('costo', '' + producto.costo);
    body.set('fecha_vencimiento', producto.fecha_vencimiento);
    return this.http.post('/stock/remitos/productos', body).map((response: Response) => response.json());
  }

  quitarProductoRemito(remitoId: number, productoId: number) {
    return this.http.del('/stock/remitos/productos/' + remitoId + '/' + productoId).map((response: Response) => response.json());
  }

}
