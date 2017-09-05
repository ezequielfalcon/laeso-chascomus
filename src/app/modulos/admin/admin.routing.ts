import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AdminGuard} from '../../guards/admin.guard';
import {AdminComponent} from './admin.component';
import {AdminHomeComponent} from './componentes/admin-home/admin-home.component';

const adminRoutes: Routes = [
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard],
  canActivateChild: [AdminGuard], children: [
    {path: '', component: AdminHomeComponent}
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
