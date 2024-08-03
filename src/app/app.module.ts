import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withFetch, withInterceptors  } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FormsModule } from '@angular/forms';

import { RegistroService } from './core/services/auth.service';

/* Parte del administrador */

import { AdminModule } from './admin/admin.module';
//footer y header
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
//utilizar material
import { MaterialModule } from './material/material.module';

//Parte del Dialogos de Registro
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogContentExampleDialog } from './shared/directives/dialog-content/dialog-content.component';
import { RecuperarPComponent } from './pages/correoRec/recuperarP.component';
import { ContraRecComponent } from './pages/contraRec/contraRec.component';

//enviar al header
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { PredeterminadoModule } from './pages/paquetes/predeterminado/predeterminado.module';

import { Parte3Component } from './pages/paquetes-personalizados/parte3/parte3.component';
import { Parte4Component } from './pages/paquetes-personalizados/parte4/parte4.component';
import { Parte5Component } from './pages/paquetes-personalizados/parte5/parte5.component';
import { Parte2Component } from './pages/paquetes-personalizados/parte2/parte2.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    HeaderComponent,
    FooterComponent,
    DialogContentExampleDialog,
    RecuperarPComponent,
    ContraRecComponent,
    Parte2Component,
    Parte3Component,
    Parte4Component,
    Parte5Component,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AdminModule,
    MaterialModule,
    BrowserAnimationsModule,
    MatDialogModule,
    NgxMaterialTimepickerModule,
    FormsModule,
    PredeterminadoModule
  ],
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    RegistroService,
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
