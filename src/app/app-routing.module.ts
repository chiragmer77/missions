import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RouterOutletComponent } from './modules/layout/router-outlet/router-outlet.component';

const routes: Routes = [
  {
    path: 'auth', loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'dashboard', loadChildren: () => import('./modules/layout/router-outlet.module').then(m => m.RouterOutletModule),
    canActivate: [AuthGuard]
  },

  {
    path: '**',
    redirectTo: 'auth',  // Redirect to auth for unknown routes
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
