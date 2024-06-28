import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './pages/inicio/inicio.component';
import { PredeterminadoComponent } from './pages/paquetes/predeterminado/predeterminado.component';
import { PaquetesPersonalizadosComponent } from './pages/paquetes-personalizados/paquetes-personalizados.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ErrorComponent } from './pages/error/error.component';


const routes: Routes = [
  {path:'', component:InicioComponent },
  {path:'paquetes', component:PredeterminadoComponent},
  {path: 'paquetes-personalizados', component:PaquetesPersonalizadosComponent},


  {path:'registro', component:RegistroComponent},



  {path:'**', component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
