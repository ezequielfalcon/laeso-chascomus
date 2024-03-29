import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../../material';
import {AdminRoutingModule} from './admin.routing';
import {AdminComponent} from './admin.component';
import {UtilsModule} from '../utils/utils.module';
import {AdminHomeComponent} from './componentes/admin-home/admin-home.component';
import {UsuariosComponent} from './componentes/usuarios/usuarios.component';
import {AdminService} from '../../servicios/datos/admin.service';
import {NuevoUsuarioComponent} from './dialogos/nuevo-usuario/nuevo-usuario.component';
import {NuevoUsuarioService} from './dialogos/nuevo-usuario/nuevo-usuario.service';
import {EditarUsuarioComponent} from './dialogos/editar-usuario/editar-usuario.component';
import {EditarUsuarioService} from './dialogos/editar-usuario/editar-usuario.service';
import {ConfirmarService} from '../utils/dialogos/confirmar/confirmar.service';
import { AjustesStockComponent } from './componentes/ajustes-stock/ajustes-stock.component';
import { RemitosComponent } from './componentes/remitos/remitos.component';
import {PreciosComponent} from './componentes/precios/precios.component';
import { HistorialPreciosComponent } from './dialogos/historial-precios/historial-precios.component';
import {HistorialPreciosService} from './dialogos/historial-precios/historial-precios.service';
import { NuevoPrecioComponent } from './dialogos/nuevo-precio/nuevo-precio.component';
import {NuevoPrecioService} from './dialogos/nuevo-precio/nuevo-precio.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    MaterialModule,
    SimpleNotificationsModule,
    AdminRoutingModule,
    UtilsModule
  ],
  declarations: [
    AdminComponent,
    AdminHomeComponent,
    UsuariosComponent,
    NuevoUsuarioComponent,
    EditarUsuarioComponent,
    AjustesStockComponent,
    RemitosComponent,
    PreciosComponent,
    HistorialPreciosComponent,
    NuevoPrecioComponent
  ],
  providers: [
    AdminService,
    NuevoUsuarioService,
    EditarUsuarioService,
    ConfirmarService,
    HistorialPreciosService,
    NuevoPrecioService
  ],
  entryComponents: [
    NuevoUsuarioComponent,
    EditarUsuarioComponent,
    HistorialPreciosComponent,
    NuevoPrecioComponent
  ]
})
export class AdminModule { }
