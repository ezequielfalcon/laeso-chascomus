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
import { SpinnerService } from './servicios/spinner.service';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NotificationsService } from 'angular2-notifications';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    HttpModule,
    SimpleNotificationsModule,
    routing,
    BrowserAnimationsModule
  ],
  providers: [
    LoginService,
    HttpVeaService,
    NotificationsService,
    SpinnerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
