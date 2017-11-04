import { Injectable } from '@angular/core';
import {HttpVeaService} from '../http-vea.service';
import {Response} from '@angular/http';
import {ProductoRemito} from '../../modelos/producto-remito';

@Injectable()
export class StockService {

  constructor(
    private http: HttpVeaService
  ) { }

  verRemitos() {
    return this.http.get('/stock/remitos').map((response: Response) => response.json());
  }

  verRemitosParaCarga(remitoId: number) {
    return this.http.get('/stock/remitos/' + remitoId).map((response: Response) => response.json().datos);
  }

  verHistorialRemito(remitoId: number) {
    return this.http.get('/stock/remitos/historial/' + remitoId).map((response: Response) => response.json().datos);
  }

  verProductosPorRemito(remitoId: number) {
    return this.http.get('/stock/remitos/productos/' + remitoId).map((response: Response) => response.json().datos);
  }

  nuevoRemitoRecibido(proveedorId: number, numero: string, obs: string) {
    const body = {
      id_proveedor: proveedorId,
      numero: numero,
      observaciones: obs
    };
    return this.http.post('/stock/remitos', body).map((response: Response) => response.json());
  }

  agregarProductoRemito(remitoId: number, producto: ProductoRemito) {
    const body = {
      id_remito: remitoId,
      id_producto: producto.id_producto,
      cantidad: producto.cantidad,
      costo: producto.costo,
      fecha_vencimiento: producto.fecha_vencimiento,
      iva: producto.iva_incluido
    };
    return this.http.post('/stock/remitos/productos', body).map((response: Response) => response.json());
  }

  quitarProductoRemito(remitoId: number, productoId: number) {
    return this.http.del('/stock/remitos/productos/' + remitoId + '/' + productoId).map((response: Response) => response.json());
  }

  confirmarRemito(remitoId: number) {
    return this.http.put('/stock/remitos/' + remitoId, new URLSearchParams()).map((response: Response) => response.json());
  }

  cerrarRemito(remitoId: number) {
    return this.http.put('/stock/remitos/cerrar/' + remitoId, new URLSearchParams()).map((response: Response) => response.json());
  }

  borrarRemito(remitoId: number) {
    return this.http.put('/stock/remitos/' + remitoId, new URLSearchParams()).map((response: Response) => response.json());
  }

}
