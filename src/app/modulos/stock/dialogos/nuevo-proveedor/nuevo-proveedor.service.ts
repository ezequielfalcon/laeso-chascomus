import {Injectable, ViewContainerRef} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import { NuevoProveedorComponent } from './nuevo-proveedor.component';

@Injectable()
export class NuevoProveedorService {

  constructor(private dialog: MatDialog) { }

  public crearProveedor(viewContainerRef: ViewContainerRef): Observable<any> {
    let dialogRef: MatDialogRef<NuevoProveedorComponent>;
    const config = new MatDialogConfig();
    config.viewContainerRef = viewContainerRef;
    dialogRef = this.dialog.open(NuevoProveedorComponent, config);
    return dialogRef.afterClosed();
  }
}
