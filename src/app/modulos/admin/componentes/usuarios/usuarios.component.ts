import {Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {Usuario} from '../../../../modelos/usuario';
import {AdminService} from '../../../../servicios/datos/admin.service';
import {NotificationsService} from 'angular2-notifications';
import {SpinnerService} from '../../../utils/directivas/spinner/spinner.service';
import {NuevoUsuarioService} from '../../dialogos/nuevo-usuario/nuevo-usuario.service';

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
    private notificationsService: NotificationsService,
    private nuevoUsuario: NuevoUsuarioService,
    private vcr: ViewContainerRef
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

  juntarRoles(usuario: Usuario): string {
    let roles = '';
    if (usuario.roles) {
      for (const rol of usuario.roles) {
        roles = roles + rol.nombre + ' ';
      }
    }
    return roles;
  }

  crearUsuario() {
    this.nuevoUsuario.crearUsuario(this.vcr).subscribe((creado) => {
      if (creado) {
        this.spinner.start();
        this.cargarUsuarios();
      }
    });
  }

  borrarUsuario(nombre: string) {
    this.spinner.start();
    this.adminService.borrarUsuario(nombre).subscribe(() => {
      this.notificationsService.success('OK', 'Usuario borrado!');
      this.cargarUsuarios();
      this.spinner.stop();
    }, error => {
      const body = JSON.parse(error._body);
      this.notificationsService.error('Error', body.mensaje);
      this.spinner.stop();
    });
  }

}
