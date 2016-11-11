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


// import {Routes} from '@angular/router';
// import {AboutComponent} from './about/about.component';
// import {HomeComponent} from './home/home.component';
// import {RepoBrowserComponent} from './github/repo-browser/repo-browser.component';
// import {RepoListComponent} from './github/repo-list/repo-list.component';
// import {RepoDetailComponent} from './github/repo-detail/repo-detail.component';

// export const rootRouterConfig: Routes = [
//   {path: '', redirectTo: 'home', pathMatch: 'full'},
//   {path: 'home', component: HomeComponent},
//   {path: 'about', component: AboutComponent},
//   {path: 'github', component: RepoBrowserComponent,
//     children: [
//       {path: '', component: RepoListComponent},
//       {path: ':org', component: RepoListComponent,
//         children: [
//           {path: '', component: RepoDetailComponent},
//           {path: ':repo', component: RepoDetailComponent}
//         ]
//       }]
//   }
// ];

