import { Component, OnInit } from '@angular/core';
import { Menu } from '../../../../modelos/menu';
import { MatDialogRef } from '@angular/material';
import { ProductosService } from '../../../../servicios/datos/productos.service';
import { NotificationsService } from 'angular2-notifications';
import { SpinnerService } from '../../../utils/directivas/spinner/spinner.service';
import { Producto } from '../../../../modelos/producto';
import { CocinaService } from '../../../../servicios/datos/cocina.service';

@Component({
  selector: 'app-nuevo-menu',
  templateUrl: './nuevo-menu.component.html',
  styleUrls: ['./nuevo-menu.component.css']
})
export class NuevoMenuComponent implements OnInit {

  nuevoMenu: Menu = new Menu();

  constructor(
    private spinner: SpinnerService,
    private notificationsService: NotificationsService,
    private cocinaService: CocinaService,
    public dialogRef: MatDialogRef<NuevoMenuComponent>
  ) { }

  ngOnInit() {
    this.spinner.stop();
  }

  crearMenu() {
    if (this.nuevoMenu.nombre) {
      this.cocinaService.crearMenu(this.nuevoMenu).subscribe(
        nuevoMenuId => {
          this.notificationsService.success('OK', 'Menú creado con éxito!');
          this.dialogRef.close(nuevoMenuId);
        }, error => {
          this.notificationsService.error('Error', error.error.mensaje);
          this.spinner.stop();
        }
      );
    }
  }

}
