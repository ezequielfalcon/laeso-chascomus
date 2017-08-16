import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../../material';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {CajaComponent} from './caja.component';
import {CajaRoutingModule} from './caja.routing';
import {UtilsModule} from '../utils/utils.module';
import {CajaHomeComponent} from './componentes/caja-home/caja-home.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    MaterialModule,
    UtilsModule,
    CajaRoutingModule
  ],
  declarations: [
    CajaComponent,
    CajaHomeComponent
  ]
})
export class CajaModule { }
