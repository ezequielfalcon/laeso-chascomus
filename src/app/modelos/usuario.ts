import {Rol} from './rol';

export class Usuario {
  nombre: string;
  nombre_apellido: string;
  email: string;
  telefono: string;
  direccion: string;
  roles: Rol[];
}
