import {Injectable, ViewContainerRef} from '@angular/core';
import {NuevoPrecioComponent} from './nuevo-precio.component';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {Producto} from '../../../../modelos/producto';

@Injectable()
export class NuevoPrecioService {

  constructor(private dialog: MatDialog) { }

  nuevoPrecioSrv(producto: Producto, viewContainerRef: ViewContainerRef) {
    let dialogRef: MatDialogRef<NuevoPrecioComponent>;
    const config = new MatDialogConfig();
    config.viewContainerRef = viewContainerRef;
    dialogRef = this.dialog.open(NuevoPrecioComponent, config);
    dialogRef.componentInstance.producto = producto;
    return dialogRef.afterClosed();
  }

}
