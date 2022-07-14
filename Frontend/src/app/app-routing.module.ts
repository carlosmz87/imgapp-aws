import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthcheckComponent } from './healthcheck/healthcheck.component';

const routes: Routes = [
  { path: 'health', component: HealthcheckComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
