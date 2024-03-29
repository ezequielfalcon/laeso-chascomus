import { SpinnerService } from './modulos/utils/directivas/spinner/spinner.service';
import { StockGuard } from './guards/stock.guard';
import { AdminGuard } from './guards/admin.guard';
import { LoginGuard } from './guards/login.guard';
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
import { HomeComponent } from './componentes/home/home.component';
import { StockModule } from './modulos/stock/stock.module';
import {CajaGuard} from './guards/caja.guard';
import {CajaModule} from './modulos/caja/caja.module';
import {AdminModule} from './modulos/admin/admin.module';
import {HttpClientModule} from '@angular/common/http';
import { ImpresionService } from './servicios/impresion.service';

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
    HttpClientModule,
    SimpleNotificationsModule.forRoot(),
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
    CajaGuard,
    ImpresionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
