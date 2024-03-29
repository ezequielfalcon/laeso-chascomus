import {Injectable, ViewContainerRef} from '@angular/core';
import {AgregarProductoComponent} from './agregar-producto.component';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {Producto} from '../../../../modelos/producto';

@Injectable()
export class AgregarProductoService {

  constructor(private dialog: MatDialog) { }

  public agregarProductos(tablaProductos: Producto[], idRemito: number, viewContainerRef: ViewContainerRef): Observable<number> {
    let dialogRef: MatDialogRef<AgregarProductoComponent>;
    const config = new MatDialogConfig();
    config.viewContainerRef = viewContainerRef;
    dialogRef = this.dialog.open(AgregarProductoComponent, config);
    dialogRef.componentInstance.productos = tablaProductos;
    dialogRef.componentInstance.idRemito = idRemito;
    return dialogRef.afterClosed();
  }

}
