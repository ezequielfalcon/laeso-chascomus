import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {RemitoRecibido} from '../../../../../modelos/remito-recibido';
import {HistorialRemito} from '../../../../../modelos/historial-remito';
import {StockService} from '../../../../../servicios/datos/stock.service';
import {SpinnerService} from '../../../../utils/directivas/spinner/spinner.service';
import {NotificationsService} from 'angular2-notifications';
import {ProductoFull} from '../../../../../modelos/producto-full';
import {ProductosService} from '../../../../../servicios/datos/productos.service';
import {ProductoRemito} from '../../../../../modelos/producto-remito';

@Component({
  selector: 'app-remito-completo',
  templateUrl: './remito-completo.component.html',
  styleUrls: ['./remito-completo.component.css']
})
export class RemitoCompletoComponent implements OnInit, OnDestroy {

  remito: RemitoRecibido;
  historialRemito: HistorialRemito[] = [];
  productosFull: ProductoFull[] = [];
  productosRemito: ProductoRemito[] = [];

  constructor(
    private route: ActivatedRoute,
    private stockService: StockService,
    private spinner: SpinnerService,
    private notificationsService: NotificationsService,
    private productosService: ProductosService
  ) { }

  ngOnInit() {
    this.route.params.switchMap((params: Params) => this.stockService.verRemitosParaCarga(+params['id']))
      .subscribe(remitoDb => {
        this.remito = remitoDb;
        this.histoRemito(this.remito.id);
      }, error => {
        const body = JSON.parse(error._body);
        this.notificationsService.error('Error', body.mensaje);
        this.spinner.stop();
      });
    this.cargarProductos();
  }

  ngOnDestroy() {
    this.spinner.start();
  }

  histoRemito(remitoId: number) {
    this.stockService.verHistorialRemito(remitoId).subscribe(historialDb => {
      this.historialRemito = historialDb;
      this.cargarProductosRemito(remitoId);
    }, error => {
      const body = JSON.parse(error._body);
      this.notificationsService.error('Error', body.mensaje);
      this.spinner.stop();
    });
  }

  cargarProductos() {
    this.productosService.verProductosFull().subscribe(productosDb => {
      this.productosFull = productosDb;
    }, error => {
      const body = JSON.parse(error._body);
      this.notificationsService.error('Error', body.mensaje);
      this.spinner.stop();
    });
  }

  cargarProductosRemito(remitoId: number) {
    this.stockService.verProductosPorRemito(remitoId).subscribe(productosDb => {
      this.productosRemito = productosDb;
      this.spinner.stop();
    }, error => {
      const body = JSON.parse(error._body);
      this.notificationsService.error('Error', body.mensaje);
      this.spinner.stop();
    });
  }

}
