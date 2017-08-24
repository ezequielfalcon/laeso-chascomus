
import {RouterModule, Routes} from '@angular/router';
import {CajaComponent} from './caja.component';
import {StockGuard} from '../../guards/stock.guard';
import {NgModule} from '@angular/core';
import {CajaHomeComponent} from './componentes/caja-home/caja-home.component';

const cajaRoutes: Routes = [
  {path: 'caja', component: CajaComponent, canActivate: [StockGuard], canActivateChild: [StockGuard],
  children: [
    {path: '', component: CajaHomeComponent}
  ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(cajaRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class CajaRoutingModule {
}
