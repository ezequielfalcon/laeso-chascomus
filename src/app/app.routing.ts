import { LoginGuard } from './guards/login.guard';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent, canActivate: [LoginGuard] },
    { path: '*', redirectTo: '', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(appRoutes);
