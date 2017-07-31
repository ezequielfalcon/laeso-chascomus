import { Proveedor } from './../../../../../modelos/proveedor';
import { ConfirmarService } from './../../../../utils/dialogos/confirmar/confirmar.service';
import { ProveedoresService } from './../../../../../servicios/datos/proveedores.service';
import { SpinnerService } from './../../../../utils/directivas/spinner/spinner.service';
import {Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-detalle-proveedor',
  templateUrl: './detalle-proveedor.component.html',
  styleUrls: ['./detalle-proveedor.component.css']
})
export class DetalleProveedorComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private spinner: SpinnerService,
    private proveedoresService: ProveedoresService,
    private notificationsService: NotificationsService,
    private router: Router,
    private confirmar: ConfirmarService,
    private vcr: ViewContainerRef
  ) { }

  returnUrl: string;
  proveedor: Proveedor;
  edicion = false;

  ngOnInit() {
    this.route.params.switchMap((params: Params) => this.proveedoresService.verProveedor(params['id'])).subscribe(proveedorDb => {
      this.proveedor = proveedorDb;
      this.spinner.stop();
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/stock/proveedores';
  }

  ngOnDestroy() {
    this.spinner.start();
  }

  editar(edit: boolean) {
    this.edicion = edit;
  }

  modificar() {
    this.spinner.start();
    this.proveedoresService.modificarProveedor(this.proveedor.id, this.proveedor.nombre, this.proveedor.telefono,
      this.proveedor.denominacion, this.proveedor.email, this.proveedor.direccion)
      .subscribe(() => {
        this.edicion = false;
        this.notificationsService.success('OK', 'Proveedor modificado!');
        this.spinner.stop();
      }, error => {
        const body = JSON.parse(error._body);
        this.notificationsService.error('Error', body.mensaje);
        this.spinner.stop();
      });
  }

  borrar() {
    this.confirmar.confirmar('Confirmar borrado', 'Está seguro que desea borrar al proveedor '
    + this.proveedor.denominacion + '?', this.vcr)
      .subscribe(confirmado => {
        if (confirmado) {
          this.spinner.start();
          this.proveedoresService.borrarProveedor(this.proveedor.id).subscribe(() => {
            this.notificationsService.success('OK', 'Proveedor borrado correctamente');
            this.router.navigate([this.returnUrl]);
          }, error => {
            const body = JSON.parse(error._body);
            this.notificationsService.error('Error', body.mensaje);
            this.spinner.stop();
          });
        }
      });
  }
}
