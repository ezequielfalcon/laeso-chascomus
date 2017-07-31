import {Injectable, ViewContainerRef} from '@angular/core';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import { NuevaCategoriaComponent } from './nueva-categoria.component';

@Injectable()
export class NuevaCategoriaService {

  constructor(private dialog: MdDialog) { }

  public crearCategoria(viewContainerRef: ViewContainerRef): Observable<any> {
    let dialogRef: MdDialogRef<NuevaCategoriaComponent>;
    const config = new MdDialogConfig();
    config.viewContainerRef = viewContainerRef;
    dialogRef = this.dialog.open(NuevaCategoriaComponent, config);
    return dialogRef.afterClosed();
  }

}
