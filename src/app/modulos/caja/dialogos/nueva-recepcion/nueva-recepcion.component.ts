import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Proveedor} from '../../../../modelos/proveedor';
import {ProveedoresService} from '../../../../servicios/datos/proveedores.service';
import {SeleccionarProveedorService} from '../seleccionar-proveedor/seleccionar-proveedor.service';
import {SpinnerService} from '../../../utils/directivas/spinner/spinner.service';
import {NotificationsService} from 'angular2-notifications';
import {StockService} from '../../../../servicios/datos/stock.service';
import {MatDialogRef} from '@angular/material';
import {ConfirmarService} from '../../../utils/dialogos/confirmar/confirmar.service';

@Component({
  selector: 'app-nueva-recepcion',
  templateUrl: './nueva-recepcion.component.html',
  styleUrls: ['./nueva-recepcion.component.css']
})
export class NuevaRecepcionComponent implements OnInit {

  proveedorSeleccionado = false;
  proveedor: Proveedor = new Proveedor;
  numeroRemito: string;
  obs: string;

  constructor(
    private proveedoresService: ProveedoresService,
    private selecProveedor: SeleccionarProveedorService,
    private vcr: ViewContainerRef,
    private spinner: SpinnerService,
    private notificationsService: NotificationsService,
    private stockServ: StockService,
    private dialog: MatDialogRef<NuevaRecepcionComponent>,
    private confirmar: ConfirmarService
  ) { }

  ngOnInit() {
  }

  seleccionarProveedor() {
    this.selecProveedor.seleccionarProveedor(this.vcr).subscribe(proveedorSeleccionadoDialogo => {
      if (proveedorSeleccionadoDialogo) {
        this.spinner.start();
        this.cargarProveedor(proveedorSeleccionadoDialogo);
      }
    });
  }

  cargarProveedor(proveedorId: number) {
    this.proveedoresService.verProveedor(proveedorId).subscribe(proveedorDb => {
      this.proveedor = proveedorDb;
      this.proveedorSeleccionado = true;
      this.spinner.stop();
    }, error => {
      const body = JSON.parse(error._body);
      this.notificationsService.error('Error', body.mensaje);
      this.spinner.stop();
    });
  }

  crearRemito() {
    this.spinner.start();
    if (this.proveedorSeleccionado) {
      if (!this.numeroRemito) {
        this.confirmar.confirmar('Remito sin número',
          'Se va a generar un número de remito aleatorio, desea continuar?', this.vcr)
          .subscribe(confirmado => {
            if (confirmado) {
              this.cargaRemito(this.proveedor.id, this.numeroRemito, this.obs);
            }
          });
      } else {
        this.cargaRemito(this.proveedor.id, this.numeroRemito, this.obs);
      }
    } else {
      this.notificationsService.warn('Error', 'Faltan datos para crear el remitoCarga!');
      this.spinner.stop();
    }
  }

  cargaRemito(proveedorId: number, numRemito: string, obs: string) {
    this.stockServ.nuevoRemitoRecibido(proveedorId, numRemito, obs).subscribe(() => {
      this.notificationsService.success('OK', 'Remito guardado!');
      this.spinner.stop();
      this.dialog.close();
    }, error => {
      const body = JSON.parse(error._body);
      this.notificationsService.error('Error', body.mensaje);
      this.spinner.stop();
    });
  }

}
