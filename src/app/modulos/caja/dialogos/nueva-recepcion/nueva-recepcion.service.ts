import {Injectable, ViewContainerRef} from '@angular/core';
import {NuevaRecepcionComponent} from './nueva-recepcion.component';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class NuevaRecepcionService {

  constructor(private dialog: MatDialog) { }

  public nuevaRecepcionDialogo(viewContainerRef: ViewContainerRef): Observable<any> {

    let dialogRef: MatDialogRef<NuevaRecepcionComponent>;
    const config = new MatDialogConfig();
    config.viewContainerRef = viewContainerRef;
    dialogRef = this.dialog.open(NuevaRecepcionComponent, config);
    return dialogRef.afterClosed();
  }

}
