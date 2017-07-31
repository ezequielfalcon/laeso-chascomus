import {Injectable, ViewContainerRef} from '@angular/core';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import { NuevoProveedorComponent } from './nuevo-proveedor.component';

@Injectable()
export class NuevoProveedorService {

  constructor(private dialog: MdDialog) { }

  public crearProveedor(viewContainerRef: ViewContainerRef): Observable<any> {
    let dialogRef: MdDialogRef<NuevoProveedorComponent>;
    const config = new MdDialogConfig();
    config.viewContainerRef = viewContainerRef;
    dialogRef = this.dialog.open(NuevoProveedorComponent, config);
    return dialogRef.afterClosed();
  }
}
