import {Injectable, ViewContainerRef} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import { NuevaUnidadComponent } from './nueva-unidad.component';

@Injectable()
export class NuevaUnidadService {

  constructor(private dialog: MatDialog) { }

  public crearUnidad(viewContainerRef: ViewContainerRef): Observable<any> {
    let dialogRef: MatDialogRef<NuevaUnidadComponent>;
    const config = new MatDialogConfig();
    config.viewContainerRef = viewContainerRef;
    dialogRef = this.dialog.open(NuevaUnidadComponent, config);
    return dialogRef.afterClosed();
  }

}
