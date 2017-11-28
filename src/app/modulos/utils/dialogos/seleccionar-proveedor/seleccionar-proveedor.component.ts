import { Component, OnInit } from '@angular/core';
import {Proveedor} from '../../../../modelos/proveedor';
import {NotificationsService} from 'angular2-notifications';
import {ProveedoresService} from '../../../../servicios/datos/proveedores.service';
import {MatDialogRef} from '@angular/material';
import {SpinnerService} from '../../directivas/spinner/spinner.service';

@Component({
  selector: 'app-seleccionar-proveedor',
  templateUrl: './seleccionar-proveedor.component.html',
  styleUrls: ['./seleccionar-proveedor.component.css']
})
export class SeleccionarProveedorComponent implements OnInit {

  proveedores: Proveedor[] = [];
  filtroNombre = '';

  constructor(
    private proveedoresService: ProveedoresService,
    private spinner: SpinnerService,
    private notificationsService: NotificationsService,
    public dialogRef: MatDialogRef<SeleccionarProveedorComponent>
  ) { }

  ngOnInit() {
    this.cargarProveedores();
  }

  cargarProveedores() {
    this.proveedoresService.traerTodos().subscribe(proveedoresDb => {
      this.proveedores = proveedoresDb.sort((p1, p2) => {
        if (p1.denominacion > p2.denominacion) {
          return 1;
        }
        if (p1.denominacion < p2.denominacion) {
          return -1;
        }
        return 0;
      });
      this.spinner.stop();
    }, error => {
      const body = JSON.parse(error._body);
      this.notificationsService.error('Error', body.mensaje);
      this.spinner.stop();
    });
  }

}
