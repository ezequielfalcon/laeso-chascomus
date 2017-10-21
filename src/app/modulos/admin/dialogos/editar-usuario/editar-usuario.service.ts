import {Injectable, ViewContainerRef} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {EditarUsuarioComponent} from './editar-usuario.component';

@Injectable()
export class EditarUsuarioService {

  constructor(private dialog: MatDialog) { }

  modUsuario(nombre: string, viewContainerRef: ViewContainerRef) {
    let dialogRef: MatDialogRef<EditarUsuarioComponent>;
    const config = new MatDialogConfig();
    config.viewContainerRef = viewContainerRef;
    dialogRef = this.dialog.open(EditarUsuarioComponent, config);
    dialogRef.componentInstance.nombreUsuario = nombre;
    return dialogRef.afterClosed();
  }

}
