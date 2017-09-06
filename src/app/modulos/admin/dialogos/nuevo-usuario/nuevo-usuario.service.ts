import {Injectable, ViewContainerRef} from '@angular/core';
import {NuevoUsuarioComponent} from './nuevo-usuario.component';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class NuevoUsuarioService {

  constructor(private dialog: MdDialog) { }

  public crearUsuario(viewContainerRef: ViewContainerRef): Observable<any> {
    let dialogRef: MdDialogRef<NuevoUsuarioComponent>;
    const config = new MdDialogConfig();
    config.viewContainerRef = viewContainerRef;
    dialogRef = this.dialog.open(NuevoUsuarioComponent, config);
    return dialogRef.afterClosed();
  }

}
