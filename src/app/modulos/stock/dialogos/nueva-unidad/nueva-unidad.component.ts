import { SpinnerService } from './../../../utils/directivas/spinner/spinner.service';
import { ProductosService } from './../../../../servicios/datos/productos.service';
import { Component, OnInit } from '@angular/core';
import {NotificationsService} from 'angular2-notifications';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-nueva-unidad',
  templateUrl: './nueva-unidad.component.html',
  styleUrls: ['./nueva-unidad.component.css']
})
export class NuevaUnidadComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NuevaUnidadComponent>,
    private productosService: ProductosService,
    private notificationsService: NotificationsService,
    private spinner: SpinnerService
  ) { }

  nombreUnidad: string;

  ngOnInit() {
  }

  crearUnidad() {
    this.productosService.nuevaUnidad(this.nombreUnidad).subscribe(
      () => {
        this.notificationsService.success('OK', 'Unidad creada!');
        this.spinner.stop();
        this.dialogRef.close();
      }, error => {
        const body = JSON.parse(error._body);
        this.notificationsService.error('Error', body.mensaje);
        this.spinner.stop();
      }
    );
  }

}
