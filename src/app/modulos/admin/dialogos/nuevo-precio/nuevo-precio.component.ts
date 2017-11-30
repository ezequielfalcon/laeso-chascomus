import { Component, OnInit } from '@angular/core';
import {ProductosService} from '../../../../servicios/datos/productos.service';
import {MatDialogRef} from '@angular/material';
import {SpinnerService} from '../../../utils/directivas/spinner/spinner.service';
import {Router} from '@angular/router';
import {NotificationsService} from 'angular2-notifications';
import {Producto} from '../../../../modelos/producto';

@Component({
  selector: 'app-nuevo-precio',
  templateUrl: './nuevo-precio.component.html',
  styleUrls: ['./nuevo-precio.component.css']
})
export class NuevoPrecioComponent implements OnInit {

  public producto: Producto;
  nuevoPrecio: number;

  constructor(
    private productosService: ProductosService,
    public dialogRef: MatDialogRef<NuevoPrecioComponent>,
    private spinner: SpinnerService,
    private router: Router,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit() {
  }

  guardarPrecio() {
    this.spinner.start();
    if (this.nuevoPrecio) {
      this.productosService.nuevoPrecio(this.producto.id, this.nuevoPrecio).subscribe(nuevoPrecioId => {
        this.notificationsService.success('OK', 'Nuevo precio creado con ID ' + nuevoPrecioId);
        this.dialogRef.close(true);
      }, error => {
        this.notificationsService.error('Error', error.error.mensaje);
        this.spinner.stop();
        if (error.status === 404) {
          this.router.navigate(['/admin']);
        }
      });
    }
  }

}
