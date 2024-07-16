import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';

import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './material/material.module';

import { RegistroService } from './core/services/auth.service';

/* Parte del administrador */

import { AdminPaquetesPersoComponent } from './pages/admin-paquetes-perso/admin-paquetes-perso.component';
import { ContenidoPaqueteComponent } from './pages/admin-paquetes-perso/contenido-paquete/contenido-paquete.component';
import { AcordeonPaqueteComponent } from './pages/admin-paquetes-perso/acordeon-paquete/acordeon-paquete.component';
import { AcordeonExperienciasComponent } from './pages/admin-paquetes-perso/acordeon-experiencias/acordeon-experiencias.component';
import { UsuarioModule } from './usuario/usuario.module';
import { AdminModule } from './admin/admin.module';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    AdminPaquetesPersoComponent,
    ContenidoPaqueteComponent,
    AcordeonPaqueteComponent,
    AcordeonExperienciasComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    UsuarioModule,
    AdminModule
  ],
  providers: [
    RegistroService,
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
