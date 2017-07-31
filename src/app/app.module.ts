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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    HttpModule,
    SimpleNotificationsModule,
    BrowserAnimationsModule,
    StockModule,
    routing
  ],
  providers: [
    LoginService,
    HttpVeaService,
    NotificationsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
