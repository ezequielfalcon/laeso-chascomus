import {Injectable, ViewContainerRef} from '@angular/core';
import {SeleccionarProveedorComponent} from './seleccionar-proveedor.component';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SeleccionarProveedorService {

  constructor(private dialog: MdDialog) { }

  public seleccionarProveedor(viewContainerRef: ViewContainerRef): Observable<number> {

    let dialogRef: MdDialogRef<SeleccionarProveedorComponent>;
    const config = new MdDialogConfig();
    config.viewContainerRef = viewContainerRef;
    dialogRef = this.dialog.open(SeleccionarProveedorComponent, config);
    return dialogRef.afterClosed();
  }

}
