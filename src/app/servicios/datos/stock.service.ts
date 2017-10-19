import { Injectable } from '@angular/core';
import {HttpVeaService} from '../http-vea.service';
import {Response, URLSearchParams} from '@angular/http';

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

}
