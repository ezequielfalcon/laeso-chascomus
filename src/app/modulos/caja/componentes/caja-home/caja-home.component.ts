import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {NuevaRecepcionService} from '../../../utils/dialogos/nueva-recepcion/nueva-recepcion.service';
import {RemitoRecibido} from '../../../../modelos/remito-recibido';
import {Proveedor} from '../../../../modelos/proveedor';
import {StockService} from '../../../../servicios/datos/stock.service';
import {ProveedoresService} from '../../../../servicios/datos/proveedores.service';
import {NotificationsService} from 'angular2-notifications';
import {SpinnerService} from '../../../utils/directivas/spinner/spinner.service';

@Component({
  selector: 'app-caja-home',
  templateUrl: './caja-home.component.html',
  styleUrls: ['./caja-home.component.css']
})
export class CajaHomeComponent implements OnInit {

  remitosRecibidos: RemitoRecibido[] = [];
  proveedores: Proveedor[] = [];

  constructor(
    private proveedoresService: ProveedoresService,
    private stockService: StockService,
    private spinner: SpinnerService,
    private notificationsService: NotificationsService,
    private nuevaRecepcion: NuevaRecepcionService,
    private vcr: ViewContainerRef
  ) { }

  ngOnInit() {
    this.cargarProveedores();
  }

  nuevaRecep() {
    this.nuevaRecepcion.nuevaRecepcionDialogo(this.vcr);
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
      this.cargarRemitos();
    }, error => {
      const body = JSON.parse(error._body);
      this.notificationsService.error('Error', body.mensaje);
      this.spinner.stop();
    });
  }

  cargarRemitos() {
    this.stockService.verRemitos().subscribe(resDb => {
      this.remitosRecibidos = resDb.remitosRec;
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
