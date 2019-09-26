import { AuthGuardService } from './services/security/auth-guard.service';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate:[AuthGuardService]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignUpPageModule)
  },
  { path: 'select-place', loadChildren: './pages/select-place/select-place.module#SelectPlacePageModule',
  canActivate:[AuthGuardService]
},
  { path: 'vehicle-list', loadChildren: './pages/vehicle-list/vehicle-list.module#VehicleListPageModule',
  canActivate:[AuthGuardService]
},
  { path: 'vehicle-detail', loadChildren: './pages/vehicle-detail/vehicle-detail.module#VehicleDetailPageModule',
  canActivate:[AuthGuardService]
},
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  { path: 'booking-list', loadChildren: './pages/booking-list/booking-list.module#BookingListPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
