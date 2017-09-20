import { Injectable } from '@angular/core';
import {HttpVeaService} from '../http-vea.service';
import {Response} from '@angular/http';

@Injectable()
export class AdminService {

  constructor(
    private http: HttpVeaService
  ) { }

  verUsuarios() {
    return this.http.get('/usuarios').map((response: Response) => response.json().datos);
  }

  verRoles() {
    return this.http.get('/roles').map((response: Response) => response.json().datos);
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
    return this.http.post('/usuarios', usuarioNuevo).map((response: Response) => response.json());
  }

  borrarUsuario(nombre: string) {
    return this.http.del('/usuarios/' + nombre).map((response: Response) => response);
  }

  verUsuario(nombre: string) {
    return this.http.get('/usuarios/' + nombre).map((response: Response) => response.json().datos);
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
    return this.http.put('/usuarios/' + nombre, usuarioNuevo).map((response: Response) => response.json());
  }

}
