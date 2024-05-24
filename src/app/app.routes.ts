import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
    {path:'login',component:LoginComponent},
    {path:'',component:DashboardComponent}
];
