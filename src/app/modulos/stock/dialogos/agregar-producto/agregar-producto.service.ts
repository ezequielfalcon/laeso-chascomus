import {Injectable, ViewContainerRef} from '@angular/core';
import {AgregarProductoComponent} from './agregar-producto.component';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {ProductoFull} from '../../../../modelos/producto-full';

@Injectable()
export class AgregarProductoService {

  constructor(private dialog: MatDialog) { }

  public agregarProductos(tablaProductos: ProductoFull[], codRemito: string, viewContainerRef: ViewContainerRef): Observable<any> {
    let dialogRef: MatDialogRef<AgregarProductoComponent>;
    const config = new MatDialogConfig();
    config.viewContainerRef = viewContainerRef;
    dialogRef = this.dialog.open(AgregarProductoComponent, config);
    dialogRef.componentInstance.productos = tablaProductos;
    dialogRef.componentInstance.codRemito = codRemito;
    return dialogRef.afterClosed();
  }

}
