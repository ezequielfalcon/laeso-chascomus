import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {Rol} from '../../../../modelos/rol';
import {AdminService} from '../../../../servicios/datos/admin.service';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css']
})
export class NuevoUsuarioComponent implements OnInit {

  roles: Rol[] = [];
  nuevoUsuario: any = {};
  clave1: string;
  clave2: string;

  constructor(
    public dialogRef: MdDialogRef<NuevoUsuarioComponent>,
    private adminService: AdminService,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit() {
    this.cargarRoles();
  }

  cargarRoles() {
    this.adminService.verRoles().subscribe(rolesDb => {
      this.roles = rolesDb;
    }, error => {
      const body = JSON.parse(error._body);
      this.notificationsService.error('Error', body.mensaje);
    });
  }

  crear() {
    if (!this.nuevoUsuario.nombre || !this.nuevoUsuario.nombre_apellido || !this.clave1 || !this.clave2) {
      this.notificationsService.warn('Error', 'Complete los datos mínimos!');
      return;
    }
    if (this.clave1 !== this.clave2) {
      this.notificationsService.warn('Error', 'Las contraseñas no coinciden');
      return;
    }
    this.adminService.crearUsuario(this.nuevoUsuario.nombre, this.nuevoUsuario.nombre_apellido, this.clave1,
      this.nuevoUsuario.email, this.nuevoUsuario.telefono, this.nuevoUsuario.direccion, this.nuevoUsuario.id_rol)
      .subscribe(() => {
        this.notificationsService.success('OK', 'Usuario creado!');
        this.dialogRef.close(true);
      });
  }

}
