import {Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {RemitoRecibido} from '../../../../modelos/remito-recibido';
import {StockService} from '../../../../servicios/datos/stock.service';
import {NotificationsService} from 'angular2-notifications';
import {SpinnerService} from '../../../utils/directivas/spinner/spinner.service';
import {ProveedoresService} from '../../../../servicios/datos/proveedores.service';
import {Proveedor} from '../../../../modelos/proveedor';
import {ConfirmarService} from '../../../utils/dialogos/confirmar/confirmar.service';

@Component({
  selector: 'app-remitos',
  templateUrl: './remitos.component.html',
  styleUrls: ['./remitos.component.css']
})
export class RemitosComponent implements OnInit, OnDestroy {

  remitosRecibidos: RemitoRecibido[] = [];
  remitosEnCarga: RemitoRecibido[] = [];
  remitosFinalizados: RemitoRecibido[] = [];
  proveedores: Proveedor[] = [];

  constructor(
    private proveedoresService: ProveedoresService,
    private stockService: StockService,
    private spinner: SpinnerService,
    private notificationsService: NotificationsService,
    private vcr: ViewContainerRef,
    private confirmar: ConfirmarService
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
      this.notificationsService.error('Error', error.error.mensaje);
      this.spinner.stop();
    });
  }

  cargarRemitos() {
    this.stockService.verRemitos().subscribe(resDb => {
      this.remitosRecibidos = resDb['remitosRec'];
      this.remitosEnCarga = resDb['remitosEnC'];
      this.remitosFinalizados = resDb['remitosCerr'];
      this.spinner.stop();
    }, error => {
      this.notificationsService.error('Error', error.error.mensaje);
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

  borrarRemito(remito: RemitoRecibido) {
    this.confirmar.confirmar('Borrar Remito ' + remito.numero,
      'Está seguro que desea elminar el remito con código ' + remito.numero +
      ' del proveedor ' + this.reemplazarProv(remito.id_proveedor), this.vcr).subscribe(confirmado => {
      if (confirmado) {
        this.spinner.start();
        this.stockService.borrarRemito(remito.id).subscribe(() => {
          this.notificationsService.success('Remito borrado', 'Remito ' +
            remito.numero + ' borrado correctamente');
          this.cargarProveedores();
        }, error => {
          this.notificationsService.error('Error', error.error.mensaje);
          this.spinner.stop();
        });
      }
    });
  }

}
