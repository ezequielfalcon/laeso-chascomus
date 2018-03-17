import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CajaComponent } from './caja.component';
import { CajaRoutingModule } from './caja.routing';
import { UtilsModule } from '../utils/utils.module';
import { CajaHomeComponent } from './componentes/caja-home/caja-home.component';
import { StockService } from '../../servicios/datos/stock.service';
import { NuevaRecepcionService } from '../utils/dialogos/nueva-recepcion/nueva-recepcion.service';
import { SeleccionarProveedorService } from '../utils/dialogos/seleccionar-proveedor/seleccionar-proveedor.service';
import { PedidosComponent } from './componentes/pedidos/pedidos.component';
import { NuevoPedidoComponent } from './dialogos/nuevo-pedido/nuevo-pedido.component';
import { NuevoPedidoService } from './dialogos/nuevo-pedido/nuevo-pedido.service';
import { DetallePedidoComponent } from './componentes/pedidos/detalle-pedido/detalle-pedido.component';
import { AgregarMenuPedidoComponent } from './dialogos/agregar-menu-pedido/agregar-menu-pedido.component';
import { AgregarMenuPedidoService } from './dialogos/agregar-menu-pedido/agregar-menu-pedido.service';

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
    PedidosComponent,
    NuevoPedidoComponent,
    DetallePedidoComponent,
    AgregarMenuPedidoComponent
  ],
  providers: [
    NuevaRecepcionService,
    SeleccionarProveedorService,
    StockService,
    NuevoPedidoService,
    AgregarMenuPedidoService
  ],
  entryComponents: [
    NuevoPedidoComponent,
    AgregarMenuPedidoComponent
  ]
})
export class CajaModule { }
