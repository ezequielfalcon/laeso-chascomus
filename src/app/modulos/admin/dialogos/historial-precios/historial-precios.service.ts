import {Injectable, ViewContainerRef} from '@angular/core';
import {HistorialPreciosComponent} from './historial-precios.component';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {Producto} from '../../../../modelos/producto';

@Injectable()
export class HistorialPreciosService {

  constructor(private dialog: MatDialog) { }

  verHistorialPrecios(producto: Producto, viewContainerRef: ViewContainerRef) {
    let dialogRef: MatDialogRef<HistorialPreciosComponent>;
    const config = new MatDialogConfig();
    config.viewContainerRef = viewContainerRef;
    dialogRef = this.dialog.open(HistorialPreciosComponent, config);
    dialogRef.componentInstance.producto = producto;
    return dialogRef.afterClosed();
  }

}
