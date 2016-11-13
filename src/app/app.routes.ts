import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, CanActivate, CanDeactivate } from '@angular/router';
import { AuthGuard } from './login/auth-guard.service';

import { ChartComponent } from './chart/chart.component'
import { MainComponent } from './home/main.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/Home',
    pathMatch: 'full'
  },
  {
    path: 'Login',
    component: LoginComponent
  },
  {
    path: 'Home',
    component: MainComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Chart',
    component: ChartComponent,
    canActivate: [AuthGuard]
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);