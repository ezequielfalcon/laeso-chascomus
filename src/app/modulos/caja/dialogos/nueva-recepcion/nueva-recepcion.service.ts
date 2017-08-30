import {Injectable, ViewContainerRef} from '@angular/core';
import {NuevaRecepcionComponent} from './nueva-recepcion.component';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class NuevaRecepcionService {

  constructor(private dialog: MdDialog) { }

  public nuevaRecepcionDialogo(viewContainerRef: ViewContainerRef): Observable<any> {

    let dialogRef: MdDialogRef<NuevaRecepcionComponent>;
    const config = new MdDialogConfig();
    config.viewContainerRef = viewContainerRef;
    dialogRef = this.dialog.open(NuevaRecepcionComponent, config);
    return dialogRef.afterClosed();
  }

}
