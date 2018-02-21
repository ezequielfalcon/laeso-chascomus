
import {RouterModule, Routes} from '@angular/router';
import {CajaComponent} from './caja.component';
import {NgModule} from '@angular/core';
import {CajaHomeComponent} from './componentes/caja-home/caja-home.component';
import {CajaGuard} from '../../guards/caja.guard';
import { PedidosComponent } from './componentes/pedidos/pedidos.component';

const cajaRoutes: Routes = [
  { path: 'caja', component: CajaComponent, canActivate: [CajaGuard], canActivateChild: [CajaGuard],
  children: [
    { path: '', component: CajaHomeComponent },
    { path: '/pedidos', component: PedidosComponent },
    { path: '*', redirectTo: '', pathMatch: 'full' }
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
