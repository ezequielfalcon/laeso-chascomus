import { Component, OnInit } from '@angular/core';
import {Producto} from '../../../../modelos/producto';
import {Precio} from '../../../../modelos/precio';
import {ProductosService} from '../../../../servicios/datos/productos.service';
import {MatDialogRef} from '@angular/material';
import {SpinnerService} from '../../../utils/directivas/spinner/spinner.service';
import {Router} from '@angular/router';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-historial-precios',
  templateUrl: './historial-precios.component.html',
  styleUrls: ['./historial-precios.component.css']
})
export class HistorialPreciosComponent implements OnInit {

  public producto: Producto;
  precios: Precio[] = [];

  constructor(
    private productosService: ProductosService,
    public dialogRef: MatDialogRef<HistorialPreciosComponent>,
    private spinner: SpinnerService,
    private router: Router,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit() {
    this.cargarPrecios();
  }

  cargarPrecios() {
    this.productosService.verPreciosProducto(this.producto.id).subscribe(preciosDb => {
      this.precios = preciosDb;
      if (this.precios.length < 1) {
        this.notificationsService.warn('Advertencia', 'El producto no tiene ningún precio cargado!');
        this.dialogRef.close(-1);
      }
    }, error => {
      const body = JSON.parse(error._body);
      this.notificationsService.error('Error', body.mensaje);
      this.spinner.stop();
      if (error.status === 404) {
        this.router.navigate(['/admin']);
      }
    });
  }

}
