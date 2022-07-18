import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthcheckComponent } from './healthcheck/healthcheck.component';
import { FrontpageComponent } from './views/frontpage/frontpage.component';

const routes: Routes = [
  { 
    path: 'health', 
    component: HealthcheckComponent 
  },
  {
    path: '',
    component: FrontpageComponent,
    pathMatch: 'full'
  
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
