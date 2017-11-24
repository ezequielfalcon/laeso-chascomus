import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AdminGuard} from '../../guards/admin.guard';
import {AdminComponent} from './admin.component';
import {AdminHomeComponent} from './componentes/admin-home/admin-home.component';
import {UsuariosComponent} from './componentes/usuarios/usuarios.component';
import {AjustesStockComponent} from './componentes/ajustes-stock/ajustes-stock.component';
import {RemitosComponent} from './componentes/remitos/remitos.component';
import {PreciosComponent} from './componentes/precios/precios.component';

const adminRoutes: Routes = [
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard],
  canActivateChild: [AdminGuard], children: [
    {path: '', component: AdminHomeComponent},
    {path: 'usuarios', component: UsuariosComponent},
    {path: 'ajustes-stock', component: AjustesStockComponent},
    {path: 'remitos', component: RemitosComponent},
    {path: 'precios', component: PreciosComponent}
  ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {

}
