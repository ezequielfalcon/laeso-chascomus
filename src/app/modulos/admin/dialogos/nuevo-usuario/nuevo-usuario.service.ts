import {Injectable, ViewContainerRef} from '@angular/core';
import {NuevoUsuarioComponent} from './nuevo-usuario.component';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class NuevoUsuarioService {

  constructor(private dialog: MatDialog) { }

  public crearUsuario(viewContainerRef: ViewContainerRef): Observable<any> {
    let dialogRef: MatDialogRef<NuevoUsuarioComponent>;
    const config = new MatDialogConfig();
    config.viewContainerRef = viewContainerRef;
    dialogRef = this.dialog.open(NuevoUsuarioComponent, config);
    return dialogRef.afterClosed();
  }

}
