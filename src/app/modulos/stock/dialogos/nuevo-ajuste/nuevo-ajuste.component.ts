import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ProductoStock} from '../../../../modelos/producto-stock';
import {SeleccionarService} from '../../../utils/dialogos/seleccionar/seleccionar.service';
import {MatDialogRef} from '@angular/material';
import {NotificationsService} from 'angular2-notifications';
import {StockService} from '../../../../servicios/datos/stock.service';
import {Ajuste} from '../../../../modelos/ajuste';
import {ConfirmarService} from '../../../utils/dialogos/confirmar/confirmar.service';

@Component({
  selector: 'app-nuevo-ajuste',
  templateUrl: './nuevo-ajuste.component.html',
  styleUrls: ['./nuevo-ajuste.component.css']
})
export class NuevoAjusteComponent implements OnInit {

  public productos: ProductoStock[];

  prodSeleccionado = false;
  producto: ProductoStock = new ProductoStock();
  cantidad = 0;
  motivo = '';

  constructor(
    private seleccionar: SeleccionarService,
    private vcr: ViewContainerRef,
    public dialogRef: MatDialogRef<NuevoAjusteComponent>,
    private notificationsService: NotificationsService,
    private stockService: StockService,
    private confirmar: ConfirmarService
  ) { }

  ngOnInit() {
  }

  seleccionarProducto() {
    this.seleccionar.seleccionarElemento(this.productos, 'Seleccionar Producto', this.vcr)
      .subscribe(seleccionado => {
        if (seleccionado) {
          for (const prod of this.productos) {
            if (prod.id === seleccionado) {
              this.producto = prod;
            }
          }
          this.prodSeleccionado = true;
        }
      });
  }

  cargarAjuste() {
    if (!this.cantidad && !this.prodSeleccionado) {
      this.notificationsService.warn('Error', 'Debe especificar una cantidad y seleccionar un producto!');
    } else {
      this.confirmar.confirmar('Ajustar stock', 'Está seguro que desea ajustar el stock del producto '
        + this.producto.nombre + '?', this.vcr).subscribe(confirmado => {
          if (confirmado) {
            const ajuste = new Ajuste();
            ajuste.motivo = this.motivo;
            this.stockService.nuevoAjuste(this.producto.id, this.cantidad, this.motivo).subscribe(nuevoAjuste => {
              this.notificationsService.success('Ok', 'Ajuste de stock creado con ID ' + nuevoAjuste.id);
              this.dialogRef.close(true);
            }, error => {
              const body = JSON.parse(error._body);
              this.notificationsService.error('Error', body.mensaje);
            });
          }
        });
    }
  }

}
