import { Component, OnInit } from '@angular/core';
import {ProductoRemito} from '../../../../modelos/producto-remito';
import {ProductoFull} from '../../../../modelos/producto-full';
import {StockService} from '../../../../servicios/datos/stock.service';
import {NotificationsService} from 'angular2-notifications';
import {MatDialogRef} from '@angular/material';
import {SpinnerService} from '../../../utils/directivas/spinner/spinner.service';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {

  public productos: ProductoFull[];
  public idRemito: number;

  productoNuevo: ProductoRemito = new ProductoRemito;
  busquedaCodigo = '';
  busquedaNombre = '';
  seleccionar = true;
  tieneIva = false;
  productosAgregados = 0;

  constructor(
    private stockService: StockService,
    private notificationsService: NotificationsService,
    public dialogRef: MatDialogRef<AgregarProductoComponent>,
    private spinner: SpinnerService
  ) { }

  ngOnInit() {
  }

  seleccionarProducto(idProducto: number) {
    this.productoNuevo.id_producto = idProducto;
    for (const prod of this.productos) {
      if (prod.id === idProducto) {
        this.productoNuevo.codigo = prod.codigo;
        this.productoNuevo.nombre = prod.nombre;
      }
    }
    this.seleccionar = false;
  }

  guardarProductoNuevo(terminar: boolean) {
    if (this.productoNuevo.costo && this.productoNuevo.cantidad) {
      if (this.productoNuevo.fecha_vencimiento) {
        if (new Date(this.productoNuevo.fecha_vencimiento) < new Date) {
          this.notificationsService.warn('Error', 'La fecha de vencimiento es anterior a la actual!!');
          return;
        }
      }
      this.spinner.start();
      this.stockService.agregarProductoRemito(this.idRemito, this.productoNuevo).subscribe(() => {
        this.productosAgregados++;
        if (terminar) {
          this.dialogRef.close(this.productosAgregados);
        } else {
          this.seleccionar = true;
          this.productoNuevo = new ProductoRemito;
        }
        this.notificationsService.success('OK', 'Producto agregado al remitoCarga!');
        this.spinner.stop();
      }, error => {
        const body = JSON.parse(error._body);
        this.notificationsService.error('Error', body.mensaje);
        this.spinner.stop();
      });
    } else {
      this.notificationsService.warn('Error', 'Complete todos los campos!');
    }
  }

}
