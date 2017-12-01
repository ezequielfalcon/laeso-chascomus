import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
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
  placeRol = 'Rol';

  constructor(
    public dialogRef: MatDialogRef<NuevoUsuarioComponent>,
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
      this.notificationsService.error('Error', error.error.mensaje);
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
      }, error => {
        this.notificationsService.error('Error', error.error.mensaje);
      });
  }

}
