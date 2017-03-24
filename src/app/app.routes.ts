import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, CanActivate, CanDeactivate } from '@angular/router';
import { AuthGuard } from './login/auth-guard.service';

import { ChartComponent } from './chart/chart.component'
import { MainHeaderComponent } from './home/main-header.component';
import { MainBodyComponent } from './home/main-body.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'Default',
    pathMatch: 'full'
  },
  {
    path: 'Login',
    component: LoginComponent
  },
  {
    path: 'Default',
    component: MainHeaderComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'Main' ,component: MainBodyComponent},
      { path: 'Main', component: MainBodyComponent},
      { path: 'Dashboard', component: DashboardComponent}
    ]
  },
  {
    path: 'Chart',
    component: ChartComponent,
    canActivate: [AuthGuard]
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);