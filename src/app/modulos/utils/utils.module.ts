import { MaterialModule } from './../../material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './directivas/spinner/spinner.component';
import { ConfirmarComponent } from './dialogos/confirmar/confirmar.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    SpinnerComponent,
    ConfirmarComponent
  ],
  entryComponents: [
    ConfirmarComponent
  ],
  exports: [
    SpinnerComponent,
    ConfirmarComponent
  ]
})
export class UtilsModule { }
