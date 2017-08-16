import { MaterialModule } from './../../material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './directivas/spinner/spinner.component';
import { ConfirmarComponent } from './dialogos/confirmar/confirmar.component';
import { FiltroPipe } from './pipes/filtro.pipe';
import { OrdenPipe } from './pipes/orden.pipe';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    SpinnerComponent,
    ConfirmarComponent,
    FiltroPipe,
    OrdenPipe
  ],
  entryComponents: [
    ConfirmarComponent
  ],
  exports: [
    SpinnerComponent,
    ConfirmarComponent,
    FiltroPipe
  ]
})
export class UtilsModule { }
