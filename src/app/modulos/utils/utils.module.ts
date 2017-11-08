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
import {NuevaRecepcionComponent} from './dialogos/nueva-recepcion/nueva-recepcion.component';
import {SeleccionarProveedorComponent} from './dialogos/seleccionar-proveedor/seleccionar-proveedor.component';

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
    SeleccionarComponent,
    NuevaRecepcionComponent,
    SeleccionarProveedorComponent
  ],
  entryComponents: [
    ConfirmarComponent,
    SeleccionarComponent,
    NuevaRecepcionComponent,
    SeleccionarProveedorComponent
  ],
  exports: [
    SpinnerComponent,
    ConfirmarComponent,
    FiltroPipe,
    LimitarPipe,
    SeleccionarComponent,
    NuevaRecepcionComponent,
    SeleccionarProveedorComponent
  ]
})
export class UtilsModule { }
