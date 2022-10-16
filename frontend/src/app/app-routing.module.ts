import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { IsAuthedGuard } from './is-authed.guard';
import { IsNotAuthedGuard } from './is-not-authed.guard';
import { TransportPageComponent } from './pages/transport-page/transport-page.component';

const routes: Routes = [
  {
    path: 'customer',
    canActivate: [IsAuthedGuard],
    children: [
      {
        path: '',
        redirectTo: 'orders',
        pathMatch: 'full',
      },
      {
        path: 'orders',
        component: MainPageComponent,
      },
      {
        path: 'transport',
        component: TransportPageComponent,
      },
    ],
  },
  {
    path: 'dispatcher',
    canActivate: [IsAuthedGuard],
    children: [
      {
        path: '',
        redirectTo: 'orders',
        pathMatch: 'full',
      },
      {
        path: 'orders',
        component: MainPageComponent,
      },
      {
        path: 'transport',
        component: TransportPageComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [IsNotAuthedGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
