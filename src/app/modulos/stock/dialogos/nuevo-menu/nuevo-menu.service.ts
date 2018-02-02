import { Injectable, ViewContainerRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { NuevoMenuComponent } from './nuevo-menu.component';

@Injectable()
export class NuevoMenuService {

    constructor(private dialog: MatDialog) { }

    public crearMenu(viewContainerRef: ViewContainerRef): Observable<any> {
      let dialogRef: MatDialogRef<NuevoMenuComponent>;
      const config = new MatDialogConfig();
      config.viewContainerRef = viewContainerRef;
      dialogRef = this.dialog.open(NuevoMenuComponent, config);
      return dialogRef.afterClosed();
    }
}
