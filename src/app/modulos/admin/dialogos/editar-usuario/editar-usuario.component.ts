import { Component, OnInit } from '@angular/core';
import {NotificationsService} from 'angular2-notifications';
import {AdminService} from '../../../../servicios/datos/admin.service';
import {MdDialogRef} from '@angular/material';
import {Rol} from '../../../../modelos/rol';
import {Usuario} from '../../../../modelos/usuario';
import {SpinnerService} from '../../../utils/directivas/spinner/spinner.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  public nombreUsuario: string;

  roles: Rol[] = [];
  usuario: Usuario = new Usuario;

  constructor(
    public dialogRef: MdDialogRef<EditarUsuarioComponent>,
    private adminService: AdminService,
    private notificationsService: NotificationsService,
    private spinner: SpinnerService
  ) { }

  ngOnInit() {
    this.cargarRoles();
  }

  cargarRoles() {
    this.adminService.verRoles().subscribe(rolesDb => {
      this.roles = rolesDb;
      this.cargarUsuario(this.nombreUsuario);
    }, error => {
      const body = JSON.parse(error._body);
      this.notificationsService.error('Error', body.mensaje);
      this.spinner.stop();
    });
  }

  cargarUsuario(nombre: string) {
    this.adminService.verUsuario(nombre).subscribe(usuarioDb => {
      this.usuario = usuarioDb;
      console.log(usuarioDb);
      this.spinner.stop();
    }, error => {
      const body = JSON.parse(error._body);
      this.notificationsService.error('Error', body.mensaje);
      this.spinner.stop();
    });
  }

}
