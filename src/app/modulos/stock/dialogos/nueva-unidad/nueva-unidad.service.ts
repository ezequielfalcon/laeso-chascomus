import {Injectable, ViewContainerRef} from '@angular/core';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import { NuevaUnidadComponent } from './nueva-unidad.component';

@Injectable()
export class NuevaUnidadService {

  constructor(private dialog: MdDialog) { }

  public crearUnidad(viewContainerRef: ViewContainerRef): Observable<any> {
    let dialogRef: MdDialogRef<NuevaUnidadComponent>;
    const config = new MdDialogConfig();
    config.viewContainerRef = viewContainerRef;
    dialogRef = this.dialog.open(NuevaUnidadComponent, config);
    return dialogRef.afterClosed();
  }

}
