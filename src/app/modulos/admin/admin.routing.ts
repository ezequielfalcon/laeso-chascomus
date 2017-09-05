import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AdminGuard} from '../../guards/admin.guard';
import {AdminComponent} from './admin.component';

const adminRoutes: Routes = [
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] }
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
