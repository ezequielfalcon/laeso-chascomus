import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Producto} from '../../../../modelos/producto';
import {ProductosService} from '../../../../servicios/datos/productos.service';
import {NotificationsService} from 'angular2-notifications/dist';
import {SpinnerService} from '../../../utils/directivas/spinner/spinner.service';
import {StockService} from '../../../../servicios/datos/stock.service';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.css']
})
export class PreciosComponent implements OnInit {

  productosPrecios: Producto[] = [];

  constructor(
    private stockService: StockService,
    private spinner: SpinnerService,
    private notificationsService: NotificationsService,
    private productosService: ProductosService,
    private vcr: ViewContainerRef
  ) { }

  ngOnInit() {
  }

}
