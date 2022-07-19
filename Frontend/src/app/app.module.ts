import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ViewsModule } from './views/views.module';
import { HealthcheckComponent } from './healthcheck/healthcheck.component';
import { AppRoutingModule } from './app-routing.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HealthcheckComponent
  ],
  imports: [
    BrowserModule,
    ViewsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [{provide:LocationStrategy, useClass:HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
