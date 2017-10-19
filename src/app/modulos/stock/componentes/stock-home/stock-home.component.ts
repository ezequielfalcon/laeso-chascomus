import {Component, OnDestroy, OnInit} from '@angular/core';
import {RemitoRecibido} from '../../../../modelos/remito-recibido';
import {StockService} from '../../../../servicios/datos/stock.service';
import {NotificationsService} from 'angular2-notifications';
import {SpinnerService} from '../../../utils/directivas/spinner/spinner.service';
import {Proveedor} from '../../../../modelos/proveedor';
import {ProveedoresService} from '../../../../servicios/datos/proveedores.service';

@Component({
  selector: 'app-stock-home',
  templateUrl: './stock-home.component.html',
  styleUrls: ['./stock-home.component.css']
})
export class StockHomeComponent implements OnInit, OnDestroy {

  remitosRecibidos: RemitoRecibido[] = [];
  remitosEnCarga: RemitoRecibido[] = [];
  proveedores: Proveedor[] = [];

  constructor(
    private proveedoresService: ProveedoresService,
    private stockServ: StockService,
    private spinner: SpinnerService,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit() {
    this.cargarProveedores();
  }

  ngOnDestroy() {
    this.spinner.start();
  }

  cargarProveedores() {
    this.proveedoresService.traerTodos().subscribe(proveedoresDb => {
      this.proveedores = proveedoresDb.sort((p1, p2) => {
        if (p1.denominacion > p2.denominacion) {
          return 1;
        }
        if (p1.denominacion < p2.denominacion) {
          return -1;
        }
        return 0;
      });
      this.cargarRemitosRecibidos();
      this.cargarRemitosEnCarga();
    }, error => {
      const body = JSON.parse(error._body);
      this.notificationsService.error('Error', body.mensaje);
      this.spinner.stop();
    });
  }

  cargarRemitosRecibidos() {
    this.stockServ.verRemitosRecibidos().subscribe(remitosDb => {
      this.remitosRecibidos = remitosDb;
      this.spinner.stop();
    }, error => {
      const body = JSON.parse(error._body);
      this.notificationsService.error('Error', body.mensaje);
      this.spinner.stop();
    });
  }

  cargarRemitosEnCarga() {
    this.stockServ.verRemitosEnCarga().subscribe(remitosDb => {
      this.remitosEnCarga = remitosDb;
      this.spinner.stop();
    }, error => {
      const body = JSON.parse(error._body);
      this.notificationsService.error('Error', body.mensaje);
      this.spinner.stop();
    });
  }

  reemplazarProv(proveedorId: number) {
    for (const prov of this.proveedores) {
      if (prov.id === proveedorId) {
        return prov.denominacion;
      }
    }
    return 'error';
  }

}
