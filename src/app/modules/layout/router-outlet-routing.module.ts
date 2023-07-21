import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterOutletComponent } from './router-outlet/router-outlet.component';

const routes: Routes = [
  {
    path: '',
    component: RouterOutletComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RouterOutletRoutingModule { }
