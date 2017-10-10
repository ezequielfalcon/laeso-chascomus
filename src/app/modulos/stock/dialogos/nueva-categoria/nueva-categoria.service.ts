import {Injectable, ViewContainerRef} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import { NuevaCategoriaComponent } from './nueva-categoria.component';

@Injectable()
export class NuevaCategoriaService {

  constructor(private dialog: MatDialog) { }

  public crearCategoria(viewContainerRef: ViewContainerRef): Observable<any> {
    let dialogRef: MatDialogRef<NuevaCategoriaComponent>;
    const config = new MatDialogConfig();
    config.viewContainerRef = viewContainerRef;
    dialogRef = this.dialog.open(NuevaCategoriaComponent, config);
    return dialogRef.afterClosed();
  }

}
