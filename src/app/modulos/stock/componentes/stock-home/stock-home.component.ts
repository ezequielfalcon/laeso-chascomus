import {Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {RemitoRecibido} from '../../../../modelos/remito-recibido';
import {StockService} from '../../../../servicios/datos/stock.service';
import {NotificationsService} from 'angular2-notifications';
import {SpinnerService} from '../../../utils/directivas/spinner/spinner.service';
import {Proveedor} from '../../../../modelos/proveedor';
import {ProveedoresService} from '../../../../servicios/datos/proveedores.service';
import {NuevaRecepcionService} from '../../../utils/dialogos/nueva-recepcion/nueva-recepcion.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-stock-home',
  templateUrl: './stock-home.component.html',
  styleUrls: ['./stock-home.component.css']
})
export class StockHomeComponent implements OnInit, OnDestroy {

  remitosRecibidos: RemitoRecibido[] = [];
  remitosEnCarga: RemitoRecibido[] = [];
  remitosFin: RemitoRecibido[] = [];
  proveedores: Proveedor[] = [];

  constructor(
    private proveedoresService: ProveedoresService,
    private stockServ: StockService,
    private spinner: SpinnerService,
    private notificationsService: NotificationsService,
    private nuevoRemito: NuevaRecepcionService,
    private vcr: ViewContainerRef,
    private router: Router
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
      this.cargarRemitos();
    }, error => {
      const body = JSON.parse(error._body);
      this.notificationsService.error('Error', body.mensaje);
      this.spinner.stop();
    });
  }

  cargarRemitos() {
    this.stockServ.verRemitos().subscribe(resDb => {
      this.remitosRecibidos = resDb.remitosRec;
      this.remitosEnCarga = resDb.remitosEnC;
      this.remitosFin = resDb.remitosCerr;
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

  cargarNuevoRemito() {
    this.nuevoRemito.nuevaRecepcionDialogo(this.vcr).subscribe(nuevoRemito => {
      if (nuevoRemito) {
        this.router.navigate(['/stock/carga-remito/' + nuevoRemito]);
      }
    });
  }

}
