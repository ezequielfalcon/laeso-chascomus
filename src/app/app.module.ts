import { SpinnerService } from './modulos/utils/directivas/spinner/spinner.service';
import { StockGuard } from './guards/stock.guard';
import { AdminGuard } from './guards/admin.guard';
import { LoginGuard } from './guards/login.guard';
import { SpinnerComponent } from './modulos/utils/directivas/spinner/spinner.component';
import { UtilsModule } from './modulos/utils/utils.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MaterialModule } from './material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import 'hammerjs';
import { routing } from './app.routing';

import { LoginComponent } from './componentes/login/login.component';
import { LoginService } from './servicios/login.service';
import { HttpVeaService } from './servicios/http-vea.service';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NotificationsService } from 'angular2-notifications';
import { ProveedoresService } from './servicios/datos/proveedores.service';
import { ProductosService } from './servicios/datos/productos.service';
import { HomeComponent } from './componentes/home/home.component';
import { StockModule } from './modulos/stock/stock.module';
import {CajaGuard} from './guards/caja.guard';
import {CajaModule} from './modulos/caja/caja.module';
import {AdminModule} from './modulos/admin/admin.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    HttpModule,
    SimpleNotificationsModule,
    BrowserAnimationsModule,
    StockModule,
    CajaModule,
    AdminModule,
    routing
  ],
  providers: [
    LoginService,
    HttpVeaService,
    NotificationsService,
    LoginGuard,
    AdminGuard,
    StockGuard,
    SpinnerService,
    CajaGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
