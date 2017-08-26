import { Injectable } from '@angular/core';
import {HttpVeaService} from '../http-vea.service';
import {Response, URLSearchParams} from '@angular/http';

@Injectable()
export class StockService {

  constructor(
    private http: HttpVeaService
  ) { }

  verRemitosRecibidos() {
    this.http.get('/stock/remitos-recibidos').map((response: Response) => response.json().datos);
  }

  nuevoRemitoRecibido(proveedorId: number, numero: string) {
    const body = new URLSearchParams();
    body.set('id_proveedor', '' + proveedorId);
    body.set('numero', numero);
    this.http.post('/stock/remitos-recibidos', body).map((response: Response) => response.json());
  }

}
