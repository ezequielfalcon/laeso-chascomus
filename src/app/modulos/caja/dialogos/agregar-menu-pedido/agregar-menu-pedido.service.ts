import { Injectable, ViewContainerRef } from '@angular/core';
import { AgregarMenuPedidoComponent } from './agregar-menu-pedido.component';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Menu } from '../../../../modelos/menu';
import { Pedido } from '../../../../modelos/pedido';
import { Producto } from '../../../../modelos/producto';

@Injectable()
export class AgregarMenuPedidoService {

  constructor(private dialog: MatDialog) { }

  public agregarMenuPedido(menu: Menu, pedido: Pedido, adicionales: Producto[], viewContainerRef: ViewContainerRef): Observable<any> {
    let dialogRef: MatDialogRef<AgregarMenuPedidoComponent>;
    const config = new MatDialogConfig();
    config.viewContainerRef = viewContainerRef;
    dialogRef = this.dialog.open(AgregarMenuPedidoComponent, config);
    dialogRef.componentInstance.menu = menu;
    dialogRef.componentInstance.pedido = pedido;
    dialogRef.componentInstance.adicionales = adicionales;
    return dialogRef.afterClosed();
  }

}
