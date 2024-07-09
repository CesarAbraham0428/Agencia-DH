import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './pages/inicio/inicio.component';

import { PredeterminadoComponent } from './pages/paquetes/predeterminado/predeterminado.component';
import { PaquetesPersonalizadosComponent } from './pages/paquetes-personalizados/paquetes-personalizados.component';
import { Parte2Component } from './pages/paquetes-personalizados/parte2/parte2.component';


import { RegistroComponent } from './pages/registro/registro.component';

import { LoginComponent } from './pages/login/login.component';
import { AdminPaquetesPersoComponent } from './pages/admin-paquetes-perso/admin-paquetes-perso.component';
import { Parte3Component } from './parte3/parte3.component';
import { Parte4Component } from './parte4/parte4.component';
import { Parte5Component } from './parte5/parte5.component';

const routes: Routes = [
  {path:'', component:InicioComponent },
  {path:'paquetes', component:PredeterminadoComponent},

  { path: 'paquetes-personalizados',
    component:PaquetesPersonalizadosComponent,
  },

  {path:'parte2', component:Parte2Component},
  {path:'parte3', component:Parte3Component},
  {path:'parte4', component:Parte4Component},
  {path:'parte5', component:Parte5Component},

  {path:'login', component:LoginComponent},

  {path:'registro', component:RegistroComponent},

  {path:'admin-personalizados', component:AdminPaquetesPersoComponent},

  {path:'**', pathMatch: 'full', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
