import { SpinnerService } from './../../../utils/directivas/spinner/spinner.service';
import { ProductosService } from './../../../../servicios/datos/productos.service';
import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-nueva-categoria',
  templateUrl: './nueva-categoria.component.html',
  styleUrls: ['./nueva-categoria.component.css']
})
export class NuevaCategoriaComponent implements OnInit {

  constructor(
    public dialogRef: MdDialogRef<NuevaCategoriaComponent>,
    private productosService: ProductosService,
    private notificationsService: NotificationsService,
    private spinner: SpinnerService
  ) { }

  nombreCat: string;

  ngOnInit() {
  }

  crearCategoria() {
    this.productosService.nuevaCategoria(this.nombreCat).subscribe(
      () => {
        this.notificationsService.success('OK', 'Categoría creada!');
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
