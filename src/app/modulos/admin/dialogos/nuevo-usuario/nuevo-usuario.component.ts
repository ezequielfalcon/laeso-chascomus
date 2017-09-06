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

}
