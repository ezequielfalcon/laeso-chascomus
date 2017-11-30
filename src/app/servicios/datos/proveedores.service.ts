import { Injectable } from '@angular/core';
import {HttpVeaService} from '../http-vea.service';

@Injectable()
export class ProveedoresService {

  constructor(
    private http: HttpVeaService
  ) { }

  traerTodos() {
    return this.http.get('/proveedores').map(response => response['datos']);
  }

  verProveedor(provedorId: number) {
    return this.http.get('/proveedores/' + provedorId).map(response => response['datos']);
  }

  nuevoProveedor(nombre: string, telefono: string, denominacion: string, email: string, direccion: string) {
    const body = {
      nombre: nombre,
      telefono: telefono,
      denominacion: denominacion,
      email: email,
      direccion: direccion
    };
    return this.http.post('/proveedores', body).map(response => response['id']);
  }

  modificarProveedor(proveedorId: number, nombre: string, telefono: string, denominacion: string, email: string, direccion: string) {
    const body = {
      nombre: nombre,
      telefono: telefono,
      denominacion: denominacion,
      email: email,
      direccion: direccion
    };
    return this.http.put('/proveedores/' + proveedorId, body);
  }

  borrarProveedor(proveedorId: number) {
    return this.http.del('/proveedores/' + proveedorId);
  }

}
