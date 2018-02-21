import { NgModule } from '@angular/core';
import {MaterialModule} from '../../material';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {CajaComponent} from './caja.component';
import {CajaRoutingModule} from './caja.routing';
import {UtilsModule} from '../utils/utils.module';
import {CajaHomeComponent} from './componentes/caja-home/caja-home.component';
import {StockService} from '../../servicios/datos/stock.service';
import {NuevaRecepcionService} from '../utils/dialogos/nueva-recepcion/nueva-recepcion.service';
import {SeleccionarProveedorService} from '../utils/dialogos/seleccionar-proveedor/seleccionar-proveedor.service';
import { PedidosComponent } from './componentes/pedidos/pedidos.component';

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
    PedidosComponent
  ],
  providers: [
    NuevaRecepcionService,
    SeleccionarProveedorService,
    StockService
  ],
  entryComponents: [
  ]
})
export class CajaModule { }
