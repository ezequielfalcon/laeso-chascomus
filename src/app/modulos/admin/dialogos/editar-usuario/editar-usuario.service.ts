import {Injectable, ViewContainerRef} from '@angular/core';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';
import {EditarUsuarioComponent} from './editar-usuario.component';

@Injectable()
export class EditarUsuarioService {

  constructor(private dialog: MdDialog) { }

  modUsuario(nombre: string, viewContainerRef: ViewContainerRef) {
    let dialogRef: MdDialogRef<EditarUsuarioComponent>;
    const config = new MdDialogConfig();
    config.viewContainerRef = viewContainerRef;
    dialogRef = this.dialog.open(EditarUsuarioComponent, config);
    dialogRef.componentInstance.nombreUsuario = nombre;
    return dialogRef.afterClosed();
  }

}
