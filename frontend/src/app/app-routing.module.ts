import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { IsAuthedGuard } from './is-authed.guard';
import { IsNotAuthedGuard } from './is-not-authed.guard';

const routes: Routes = [
  { path: '', component: MainPageComponent, canActivate: [IsAuthedGuard] },
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
