import {Injectable, ViewContainerRef} from '@angular/core';
import {SeleccionarProveedorComponent} from './seleccionar-proveedor.component';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SeleccionarProveedorService {

  constructor(private dialog: MatDialog) { }

  public seleccionarProveedor(viewContainerRef: ViewContainerRef): Observable<number> {

    let dialogRef: MatDialogRef<SeleccionarProveedorComponent>;
    const config = new MatDialogConfig();
    config.viewContainerRef = viewContainerRef;
    dialogRef = this.dialog.open(SeleccionarProveedorComponent, config);
    return dialogRef.afterClosed();
  }

}
