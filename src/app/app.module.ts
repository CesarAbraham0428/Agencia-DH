import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



import { HttpClientModule } from '@angular/common/http';
import { DataServices } from './data.services';
import { LoginComponent } from './pages/login/login.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  

    HttpClientModule,
  ],
  providers: [
    provideClientHydration(),
    DataServices
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
