import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from "./pages/inicio/inicio.component";
import { PredeterminadoComponent } from './pages/paquetes/predeterminado/predeterminado.component';
import { Router, RouterModule, Routes } from '@angular/router';

const appRouting: Routes=[
  {path:'', component:InicioComponent },
  {path:'paquetes', component:PredeterminadoComponent},

]

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    PredeterminadoComponent
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
