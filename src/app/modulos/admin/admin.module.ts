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
    AdminHomeComponent
  ]
})
export class AdminModule { }
