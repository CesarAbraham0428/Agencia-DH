import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from "./pages/inicio/inicio.component";
import { PredeterminadoComponent } from './pages/paquetes/predeterminado/predeterminado.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { PaquetesPersonalizadosComponent } from './pages/paquetes-personalizados/paquetes-personalizados.component';

const appRouting: Routes=[
  {path:'', component:InicioComponent },
  {path:'paquetes', component:PredeterminadoComponent},
  {path: 'paquetes-personalizados', component:PaquetesPersonalizadosComponent}

]

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    PredeterminadoComponent,
    PaquetesPersonalizadosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRouting)
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
