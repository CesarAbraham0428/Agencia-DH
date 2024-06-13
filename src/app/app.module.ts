import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from "./pages/inicio/inicio.component";
import { PredeterminadoComponent } from './pages/paquetes/predeterminado/predeterminado.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    PredeterminadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
