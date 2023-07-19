import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth', loadChildren: () => import('./modules/authentication/authentication/authentication.module').then(m => m.AuthenticationModule),
    data: { preload: true, delay: true },
  },
  {
    path: '',
    redirectTo: 'auth', pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
