import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';

const appRoutes: Routes = [
    { path: '', component: LoginComponent },

    { path: '*', redirectTo: '/home' }
];

export const routing = RouterModule.forRoot(appRoutes);
