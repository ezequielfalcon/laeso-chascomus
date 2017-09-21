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
    EditarUsuarioComponent
  ],
  providers: [
    AdminService,
    NuevoUsuarioService,
    EditarUsuarioService
  ],
  entryComponents: [
    NuevoUsuarioComponent,
    EditarUsuarioComponent
  ]
})
export class AdminModule { }
