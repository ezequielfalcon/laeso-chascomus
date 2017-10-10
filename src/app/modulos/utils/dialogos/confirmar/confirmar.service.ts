import {Injectable, ViewContainerRef} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import { ConfirmarComponent } from './confirmar.component';

@Injectable()
export class ConfirmarService {

  constructor(private dialog: MatDialog) { }

  public confirmar(title: string, message: string, viewContainerRef: ViewContainerRef): Observable<boolean> {

    let dialogRef: MatDialogRef<ConfirmarComponent>;
    const config = new MatDialogConfig();
    config.viewContainerRef = viewContainerRef;

    dialogRef = this.dialog.open(ConfirmarComponent, config);

    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;

    return dialogRef.afterClosed();
  }

}
