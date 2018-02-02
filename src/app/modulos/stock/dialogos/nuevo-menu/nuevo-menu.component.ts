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
  ingredientes: Producto[] = [];

  constructor(
    private spinner: SpinnerService,
    private notificationsService: NotificationsService,
    private cocinaService: CocinaService,
    public dialogRef: MatDialogRef<NuevoMenuComponent>
  ) { }

  ngOnInit() {
    this.cargarIngredientes();
  }

  cargarIngredientes() {
    this.cocinaService.verIngredientes().subscribe(
      ingredientesDb => {
        this.ingredientes = ingredientesDb;
        this.spinner.stop();
      }, error => {
        this.notificationsService.error('Error', error.error.mensaje);
        this.spinner.stop();
      }
    );
  }

}
