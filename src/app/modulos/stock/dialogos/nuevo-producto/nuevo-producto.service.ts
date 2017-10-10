import {Injectable, ViewContainerRef} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import { NuevoProductoComponent } from './nuevo-producto.component';

@Injectable()
export class NuevoProductoService {

  constructor(private dialog: MatDialog) { }

  public crearProducto(viewContainerRef: ViewContainerRef): Observable<any> {
    let dialogRef: MatDialogRef<NuevoProductoComponent>;
    const config = new MatDialogConfig();
    config.viewContainerRef = viewContainerRef;
    dialogRef = this.dialog.open(NuevoProductoComponent, config);
    return dialogRef.afterClosed();
  }

}
