import {Injectable, ViewContainerRef} from '@angular/core';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import { NuevoProductoComponent } from './nuevo-producto.component';

@Injectable()
export class NuevoProductoService {

  constructor(private dialog: MdDialog) { }

  public crearProducto(viewContainerRef: ViewContainerRef): Observable<any> {
    let dialogRef: MdDialogRef<NuevoProductoComponent>;
    const config = new MdDialogConfig();
    config.viewContainerRef = viewContainerRef;
    dialogRef = this.dialog.open(NuevoProductoComponent, config);
    return dialogRef.afterClosed();
  }

}
