import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Proveedor} from '../../../../modelos/proveedor';
import {ProveedoresService} from '../../../../servicios/datos/proveedores.service';
import {SeleccionarProveedorService} from '../seleccionar-proveedor/seleccionar-proveedor.service';
import {SpinnerService} from '../../../utils/directivas/spinner/spinner.service';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-nueva-recepcion',
  templateUrl: './nueva-recepcion.component.html',
  styleUrls: ['./nueva-recepcion.component.css']
})
export class NuevaRecepcionComponent implements OnInit {

  proveedorSeleccionado = false;
  proveedor: Proveedor = new Proveedor;

  constructor(
    private proveedoresService: ProveedoresService,
    private selecProveedor: SeleccionarProveedorService,
    private vcr: ViewContainerRef,
    private spinner: SpinnerService,
    private notificationsService: NotificationsService
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
    }, error => {
      const body = JSON.parse(error._body);
      this.notificationsService.error('Error', body.mensaje);
      this.spinner.stop();
    });
  }

}
