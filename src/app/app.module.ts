import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './pages/login/login.component';

import { RegistroComponent } from './pages/registro/registro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminPaquetesPersoComponent } from './pages/admin-paquetes-perso/admin-paquetes-perso.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    AdminPaquetesPersoComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
