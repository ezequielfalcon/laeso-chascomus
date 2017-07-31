import { Injectable } from '@angular/core';
import {HttpVeaService} from '../http-vea.service';
import {Response, URLSearchParams} from '@angular/http';

@Injectable()
export class ProveedoresService {

  constructor(
    private http: HttpVeaService
  ) { }

  traerTodos() {
    return this.http.get('/proveedores').map((response: Response) => response.json().datos);
  }

  verProveedor(provedorId: number) {
    return this.http.get('/proveedores/' + provedorId).map((response: Response) => response.json().datos);
  }

  nuevoProveedor(nombre: string, telefono: string, denominacion: string, email: string, direccion: string) {
    const body = new URLSearchParams();
    body.set('nombre', nombre);
    body.set('telefono', telefono);
    body.set('denominacion', denominacion);
    body.set('email', email);
    body.set('direccion', direccion);
    return this.http.post('/proveedores', body).map((response: Response) => response.json().id);
  }

  modificarProveedor(proveedorId: number, nombre: string, telefono: string, denominacion: string, email: string, direccion: string) {
    const body = new URLSearchParams();
    body.set('nombre', nombre);
    body.set('telefono', telefono);
    body.set('denominacion', denominacion);
    body.set('email', email);
    body.set('direccion', direccion);
    return this.http.put('/proveedores/' + proveedorId, body).map((response: Response) => response.json());
  }

  borrarProveedor(proveedorId: number) {
    return this.http.del('/proveedores/' + proveedorId).map((response: Response) => response.json());
  }

}
