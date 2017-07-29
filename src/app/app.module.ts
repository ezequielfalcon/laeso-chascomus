import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterialModule } from './material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import 'hammerjs';
import { routing } from './app.routing';

import { LoginComponent } from './componentes/login/login.component';
import { LoginService } from './servicios/login.service';
import { HttpVeaService } from './servicios/http-vea.service';
import { SpinnerService } from './servicios/spinner.service';
import { SimpleNotificationsModule } from 'angular2-notifications';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    SimpleNotificationsModule,
    routing
  ],
  providers: [
    LoginService,
    HttpVeaService,
    SpinnerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
