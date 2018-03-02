import { Injectable, ViewContainerRef } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { NuevoPedidoComponent } from './nuevo-pedido.component';

@Injectable()
export class NuevoPedidoService {

  constructor(private dialog: MatDialog) { }

  public nuevoPedido(viewContainerRef: ViewContainerRef): Observable<any> {
    let dialogRef: MatDialogRef<NuevoPedidoComponent>;
    const config = new MatDialogConfig();
    config.viewContainerRef = viewContainerRef;
    dialogRef = this.dialog.open(NuevoPedidoComponent, config);
    return dialogRef.afterClosed();
  }

}
