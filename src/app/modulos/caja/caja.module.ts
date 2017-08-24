import { NgModule } from '@angular/core';
import {MaterialModule} from '../../material';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {CajaComponent} from './caja.component';
import {CajaRoutingModule} from './caja.routing';
import {UtilsModule} from '../utils/utils.module';
import {CajaHomeComponent} from './componentes/caja-home/caja-home.component';
import {NuevaRecepcionComponent} from './dialogos/nueva-recepcion/nueva-recepcion.component';
import {NuevaRecepcionService} from './dialogos/nueva-recepcion/nueva-recepcion.service';
import {SeleccionarProveedorComponent} from './dialogos/seleccionar-proveedor/seleccionar-proveedor.component';
import {SeleccionarProveedorService} from './dialogos/seleccionar-proveedor/seleccionar-proveedor.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    UtilsModule,
    CajaRoutingModule
  ],
  declarations: [
    CajaComponent,
    CajaHomeComponent,
    NuevaRecepcionComponent,
    SeleccionarProveedorComponent
  ],
  providers: [
    NuevaRecepcionService,
    SeleccionarProveedorService
  ],
  entryComponents: [
    NuevaRecepcionComponent,
    SeleccionarProveedorComponent
  ]
})
export class CajaModule { }
