import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from "./pages/inicio/inicio.component";
import { Router, RouterModule, Routes } from '@angular/router';
import { PaquetesPersonalizadosComponent } from './pages/paquetes-personalizados/paquetes-personalizados.component';
import { Parte2Component } from './pages/paquetes-personalizados/parte2/parte2.component';





const appRouting: Routes=[
  {path:'', component:InicioComponent },
  {path: 'paquetes-personalizados', component:PaquetesPersonalizadosComponent},
  {path: 'parte2', component:Parte2Component}
 

 
  
  

]

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
  
    PaquetesPersonalizadosComponent,
    Parte2Component,

   
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
