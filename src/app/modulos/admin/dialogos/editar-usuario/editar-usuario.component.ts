import { Component, OnInit } from '@angular/core';
import {NotificationsService} from 'angular2-notifications';
import {AdminService} from '../../../../servicios/datos/admin.service';
import {MdDialogRef} from '@angular/material';
import {Rol} from '../../../../modelos/rol';
import {Usuario} from '../../../../modelos/usuario';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  roles: Rol[] = [];
  usuario: Usuario = new Usuario;

  constructor(
    public dialogRef: MdDialogRef<EditarUsuarioComponent>,
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

  cargarUsuario(nombre: string) {

  }

}
