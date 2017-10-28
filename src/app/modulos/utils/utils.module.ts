import { MaterialModule } from './../../material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './directivas/spinner/spinner.component';
import { ConfirmarComponent } from './dialogos/confirmar/confirmar.component';
import { FiltroPipe } from './pipes/filtro.pipe';
import { OrdenPipe } from './pipes/orden.pipe';
import { LimitarPipe } from './pipes/limitar.pipe';
import { SeleccionarComponent } from './dialogos/seleccionar/seleccionar.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [
    SpinnerComponent,
    ConfirmarComponent,
    FiltroPipe,
    OrdenPipe,
    LimitarPipe,
    SeleccionarComponent
  ],
  entryComponents: [
    ConfirmarComponent,
    SeleccionarComponent
  ],
  exports: [
    SpinnerComponent,
    ConfirmarComponent,
    FiltroPipe,
    LimitarPipe,
    SeleccionarComponent
  ]
})
export class UtilsModule { }
