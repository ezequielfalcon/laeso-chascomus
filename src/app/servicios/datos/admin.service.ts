import { Injectable } from '@angular/core';
import {HttpVeaService} from '../http-vea.service';

@Injectable()
export class AdminService {

  constructor(
    private http: HttpVeaService
  ) { }

  verUsuarios() {
    return this.http.get('/usuarios').map(response => response['datos']);
  }

  verRoles() {
    return this.http.get('/roles').map(response => response['datos']);
  }

  crearUsuario(nombre: string, nombre_completo: string, clave: string, email: string,
               telefono: string, direccion: string, id_rol: number) {
    const usuarioNuevo = {
      nombre: nombre,
      nombre_apellido: nombre_completo,
      clave: clave,
      email: email,
      telefono: telefono,
      direccion: direccion,
      id_rol: id_rol
    };
    return this.http.post('/usuarios', usuarioNuevo);
  }

  borrarUsuario(nombre: string) {
    return this.http.del('/usuarios/' + nombre);
  }

  verUsuario(nombre: string) {
    return this.http.get('/usuarios/' + nombre).map(response => response['datos']);
  }

  modificarUsuario(nombre: string, nombre_completo: string, clave: string, email: string,
               telefono: string, direccion: string, id_rol: number) {
    const usuarioNuevo = {
      nombre_apellido: nombre_completo,
      clave: clave,
      email: email,
      telefono: telefono,
      direccion: direccion,
      id_rol: id_rol
    };
    return this.http.put('/usuarios/' + nombre, usuarioNuevo);
  }

}
