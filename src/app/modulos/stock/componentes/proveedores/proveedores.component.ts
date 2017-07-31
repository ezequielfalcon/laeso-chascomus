import { SpinnerService } from './../../../utils/directivas/spinner/spinner.service';
import { ProveedoresService } from './../../../../servicios/datos/proveedores.service';
import { Proveedor } from './../../../../modelos/proveedor';
import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import {NotificationsService} from 'angular2-notifications';
import {Router} from '@angular/router';
import { NuevoProveedorService } from '../../dialogos/nuevo-proveedor/nuevo-proveedor.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit, OnDestroy {

  proveedores: Proveedor[] = [];

  constructor(
    private proveedoresService: ProveedoresService,
    private spinner: SpinnerService,
    private notificationsService: NotificationsService,
    private dialogoNuevoProveedor: NuevoProveedorService,
    private vcr: ViewContainerRef,
    public router: Router
  ) { }

  ngOnInit() {
    this.cargarProveedores();
  }

  ngOnDestroy() {
    this.spinner.start();
  }

  nuevoProveedor() {
    this.dialogoNuevoProveedor.crearProveedor(this.vcr).subscribe(() => {
      this.cargarProveedores();
    });
  }

  cargarProveedores() {
    this.proveedoresService.traerTodos().subscribe(proveedoresDb => {
      this.proveedores = proveedoresDb;
      this.spinner.stop();
    }, error => {
      const body = JSON.parse(error._body);
      this.notificationsService.error('Error', body.mensaje);
      this.spinner.stop();
    });
  }

}
