import {Injectable, ViewContainerRef} from '@angular/core';
import {SeleccionarComponent} from './seleccionar.component';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SeleccionarService {

  constructor(private dialog: MatDialog) { }

  public seleccionarElemento(elementos: any[], titulo: string, viewContainerRef: ViewContainerRef): Observable<any> {
    let dialogRef: MatDialogRef<SeleccionarComponent>;
    const config = new MatDialogConfig();
    config.viewContainerRef = viewContainerRef;
    dialogRef = this.dialog.open(SeleccionarComponent, config);
    dialogRef.componentInstance.titulo = titulo;
    dialogRef.componentInstance.elementos = elementos;
    return dialogRef.afterClosed();
  }

}
