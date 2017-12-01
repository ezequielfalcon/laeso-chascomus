import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {NuevaRecepcionService} from '../../../utils/dialogos/nueva-recepcion/nueva-recepcion.service';
import {RemitoRecibido} from '../../../../modelos/remito-recibido';
import {Proveedor} from '../../../../modelos/proveedor';
import {StockService} from '../../../../servicios/datos/stock.service';
import {ProveedoresService} from '../../../../servicios/datos/proveedores.service';
import {NotificationsService} from 'angular2-notifications';
import {SpinnerService} from '../../../utils/directivas/spinner/spinner.service';
import {ConfirmarService} from '../../../utils/dialogos/confirmar/confirmar.service';

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
    private vcr: ViewContainerRef,
    private confirmar: ConfirmarService
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
      this.notificationsService.error('Error', error.error.mensaje);
      this.spinner.stop();
    });
  }

  cargarRemitos() {
    this.stockService.verRemitos().subscribe(resDb => {
      this.remitosRecibidos = resDb['remitosRec'];
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
