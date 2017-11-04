import { ConfirmarService } from '../utils/dialogos/confirmar/confirmar.service';
import { ProductosService } from '../../servicios/datos/productos.service';
import { ProveedoresService } from '../../servicios/datos/proveedores.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { UtilsModule } from '../utils/utils.module';
import { NgModule } from '@angular/core';
import { StockComponent } from './stock.component';
import { ConfiguracionesComponent } from './componentes/configuraciones/configuraciones.component';
import { CategoriasComponent } from './componentes/configuraciones/categorias/categorias.component';
import { UnidadesComponent } from './componentes/configuraciones/unidades/unidades.component';
import { NuevaCategoriaComponent } from './dialogos/nueva-categoria/nueva-categoria.component';
import { NuevaUnidadComponent } from './dialogos/nueva-unidad/nueva-unidad.component';
import { NuevoProductoComponent } from './dialogos/nuevo-producto/nuevo-producto.component';
import { NuevoProveedorComponent } from './dialogos/nuevo-proveedor/nuevo-proveedor.component';
import { NuevaCategoriaService } from './dialogos/nueva-categoria/nueva-categoria.service';
import { NuevaUnidadService } from './dialogos/nueva-unidad/nueva-unidad.service';
import { NuevoProductoService } from './dialogos/nuevo-producto/nuevo-producto.service';
import { NuevoProveedorService } from './dialogos/nuevo-proveedor/nuevo-proveedor.service';
import { StockRoutingModule } from './stock.routing';
import { DetalleProveedorComponent } from './componentes/proveedores/detalle-proveedor/detalle-proveedor.component';
import { DetalleProductoComponent } from './componentes/productos/detalle-producto/detalle-producto.component';
import { ProveedoresComponent } from './componentes/proveedores/proveedores.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { StockHomeComponent } from './componentes/stock-home/stock-home.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { MaterialModule } from '../../material';
import {StockService} from '../../servicios/datos/stock.service';
import { RemitoCompletoComponent } from './componentes/stock-home/remito-completo/remito-completo.component';
import { AgregarProductoComponent } from './dialogos/agregar-producto/agregar-producto.component';
import {AgregarProductoService} from './dialogos/agregar-producto/agregar-producto.service';
import {SeleccionarService} from '../utils/dialogos/seleccionar/seleccionar.service';
import { StockProductosComponent } from './componentes/stock-productos/stock-productos.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    SimpleNotificationsModule,
    StockRoutingModule,
    UtilsModule
  ],
  declarations: [
    StockComponent,
    ConfiguracionesComponent,
    CategoriasComponent,
    UnidadesComponent,
    NuevaCategoriaComponent,
    NuevaUnidadComponent,
    NuevoProductoComponent,
    NuevoProveedorComponent,
    DetalleProveedorComponent,
    DetalleProductoComponent,
    ProveedoresComponent,
    ProductosComponent,
    StockHomeComponent,
    RemitoCompletoComponent,
    AgregarProductoComponent,
    StockProductosComponent
  ],
  entryComponents: [
    NuevaCategoriaComponent,
    NuevaUnidadComponent,
    NuevoProductoComponent,
    NuevoProveedorComponent,
    AgregarProductoComponent
  ],
  providers: [
    NuevaCategoriaService,
    NuevaUnidadService,
    NuevoProductoService,
    NuevoProveedorService,
    ProveedoresService,
    ProductosService,
    ConfirmarService,
    StockService,
    AgregarProductoService,
    SeleccionarService
  ]
})
export class StockModule { }
