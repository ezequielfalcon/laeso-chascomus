import { Component, OnInit } from '@angular/core';
import {ProductoRemito} from '../../../../modelos/producto-remito';
import {ProductoFull} from '../../../../modelos/producto-full';
import {StockService} from '../../../../servicios/datos/stock.service';
import {NotificationsService} from 'angular2-notifications';
import {MatDialogRef} from '@angular/material';

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

  constructor(
    private stockService: StockService,
    private notificationsService: NotificationsService,
    public dialogRef: MatDialogRef<AgregarProductoComponent>
  ) { }

  ngOnInit() {
  }

}
