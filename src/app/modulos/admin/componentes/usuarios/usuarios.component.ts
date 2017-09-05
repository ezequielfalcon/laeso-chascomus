import {Component, OnDestroy, OnInit} from '@angular/core';
import {Usuario} from '../../../../modelos/usuario';
import {AdminService} from '../../../../servicios/datos/admin.service';
import {NotificationsService} from 'angular2-notifications';
import {SpinnerService} from '../../../utils/directivas/spinner/spinner.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, OnDestroy {

  usuarios: Usuario[] = [];

  constructor(
    private adminService: AdminService,
    private spinner: SpinnerService,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  ngOnDestroy() {
    this.spinner.start();
  }

  cargarUsuarios() {
    this.adminService.verUsuarios().subscribe(usuariosDb => {
      this.usuarios = usuariosDb;
      this.spinner.stop();
    }, error => {
      const body = JSON.parse(error._body);
      this.notificationsService.error('Error', body.mensaje);
      this.spinner.stop();
    });
  }

}
