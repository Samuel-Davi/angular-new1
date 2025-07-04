import { Routes } from '@angular/router';
import { Login } from './features/pages/login/login';
import { Dashboard } from './features/pages/dashboard/dashboard';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginGuard } from './core/guards/login.guard';

export const routes: Routes = [
    { 
        path: '',
        redirectTo: 'login', 
        pathMatch: 'full'
    },
    {
        path: 'login', 
        component: Login,
        canActivate: [LoginGuard]
    },
    {
        path: 'dashboard', 
        component: Dashboard, 
        canActivate: [AuthGuard]
    }
];
