import { Injectable, ViewContainerRef } from '@angular/core';
import { AgregarIngredienteComponent } from './agregar-ingrediente.component';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Producto } from '../../../../modelos/producto';
import { Menu } from '../../../../modelos/menu';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AgregarIngredienteService {

  constructor(private dialog: MatDialog) { }

  public agregarIngredientes(ingredientes: Producto[], menu: Menu, viewContainerRef: ViewContainerRef): Observable<number> {
    let dialogRef: MatDialogRef<AgregarIngredienteComponent>;
    const config = new MatDialogConfig();
    config.viewContainerRef = viewContainerRef;
    dialogRef = this.dialog.open(AgregarIngredienteComponent, config);
    dialogRef.componentInstance.menu = menu;
    dialogRef.componentInstance.ingredientes = ingredientes;
    return dialogRef.afterClosed();
  }

}
