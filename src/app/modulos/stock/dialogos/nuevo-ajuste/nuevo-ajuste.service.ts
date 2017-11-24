import {Injectable, ViewContainerRef} from '@angular/core';
import {NuevoAjusteComponent} from './nuevo-ajuste.component';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {Producto} from '../../../../modelos/producto';

@Injectable()
export class NuevoAjusteService {

  constructor(private dialog: MatDialog) { }

  public crearAjuste(productos: Producto[], viewContainerRef: ViewContainerRef): Observable<any> {
    let dialogRef: MatDialogRef<NuevoAjusteComponent>;
    const config = new MatDialogConfig();
    config.viewContainerRef = viewContainerRef;
    dialogRef = this.dialog.open(NuevoAjusteComponent, config);
    dialogRef.componentInstance.productos = productos;
    return dialogRef.afterClosed();
  }

}
