import {Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {StockService} from '../../../../servicios/datos/stock.service';
import {NotificationsService} from 'angular2-notifications';
import {SpinnerService} from '../../../utils/directivas/spinner/spinner.service';
import {Ajuste} from '../../../../modelos/ajuste';

@Component({
  selector: 'app-ajustes-stock',
  templateUrl: './ajustes-stock.component.html',
  styleUrls: ['./ajustes-stock.component.css']
})
export class AjustesStockComponent implements OnInit, OnDestroy {

  ajustes: Ajuste[] = [];

  constructor(
    private stockService: StockService,
    private spinner: SpinnerService,
    private notificationsService: NotificationsService,
    private vcr: ViewContainerRef
  ) { }

  ngOnInit() {
    this.cargarAjustes();
  }

  ngOnDestroy() {
    this.spinner.start();
  }

  cargarAjustes() {
    this.stockService.verAjustesStock().subscribe(ajustesDb => {
      this.ajustes = ajustesDb;
      this.spinner.stop();
    }, error => {
      this.notificationsService.error('Error', error.error.mensaje);
      this.spinner.stop();
    });
  }

}
