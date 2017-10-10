import { SpinnerService } from './../../../utils/directivas/spinner/spinner.service';
import { ProveedoresService } from './../../../../servicios/datos/proveedores.service';
import {Component, OnInit} from '@angular/core';
import {NotificationsService} from 'angular2-notifications';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-nuevo-proveedor',
  templateUrl: './nuevo-proveedor.component.html',
  styleUrls: ['./nuevo-proveedor.component.css']
})
export class NuevoProveedorComponent implements OnInit {

  nuevoProveedor: any = {};

  static capitalize(texto: string) {
    return texto.replace(/\b\w/g, l => l.toUpperCase());
  }

  constructor(
    private proveedoresService: ProveedoresService,
    private notificationsService: NotificationsService,
    private spinner: SpinnerService,
    public dialogRef: MatDialogRef<NuevoProveedorComponent>
  ) { }

  ngOnInit() {
  }

  crearProveedor() {
    this.spinner.start();
    if (!this.nuevoProveedor.denominacion) {
      this.spinner.stop();
      this.notificationsService.alert('Error', 'El campo Denominación es obligatorio!');
      return;
    }
    const nombre = this.nuevoProveedor.nombre || ' ';
    const nombreCap = NuevoProveedorComponent.capitalize(nombre);
    const email = this.nuevoProveedor.email || null;
    const direccion = this.nuevoProveedor.direccion || null;
    const telefono = this.nuevoProveedor.telefono || ' ';
    this.proveedoresService.nuevoProveedor(nombreCap, telefono, this.nuevoProveedor.denominacion, email, direccion).subscribe(nuevoId => {
      this.notificationsService.success('OK', 'Proveedor creado con ID ' + nuevoId);
      this.spinner.stop();
      this.dialogRef.close();
    }, error => {
      const body = JSON.parse(error._body);
      this.notificationsService.error('Error', body.mensaje);
      this.spinner.stop();
    });
  }

}
