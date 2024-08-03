import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { InicioComponent } from './pages/inicio/inicio.component';
import { PredeterminadoComponent } from './pages/paquetes/predeterminado/predeterminado.component';
import { PaquetesPersonalizadosComponent } from './pages/paquetes-personalizados/paquetes-personalizados.component';
import { Parte2Component } from './pages/paquetes-personalizados/parte2/parte2.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { userGuard } from './guard/auth.guard';
import { adminGuard } from './guard/admin.guard';
import { Parte3Component } from './pages/paquetes-personalizados/parte3/parte3.component';

import { Parte5Component } from './pages/paquetes-personalizados/parte5/parte5.component';
import { Parte4Component } from './pages/paquetes-personalizados/parte4/parte4.component';
import { gestorGuard } from './guard/gestor.guard';
import { RecuperarPComponent } from './pages/correoRec/recuperarP.component';
import { ContraRecComponent } from './pages/contraRec/contraRec.component';


const routes: Routes = [
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate:[adminGuard]},
  {path: 'gestor', loadChildren: () => import('./gestor/gestor.module').then(m => m.GestorModule), canActivate:[gestorGuard]},
  {path: 'inicio', component: InicioComponent },
  {path: '', redirectTo: '/inicio', pathMatch: 'full' },
  {path:'registro', component:RegistroComponent},
  {path:'login', component:LoginComponent},
  {path:'paquetes', component:PredeterminadoComponent},
  {path:'enviar-correo-recuperacion', component:RecuperarPComponent},
  {path:'reestablecer-contraseña', component:ContraRecComponent},

  {path: 'paquetes-personalizados',component:PaquetesPersonalizadosComponent,canActivate: [userGuard]} ,
  {path:'parte2', component:Parte2Component,canActivate: [userGuard]},
  {path:'parte3', component:Parte3Component,canActivate: [userGuard]},
  {path:'parte4', component:Parte4Component, canActivate: [userGuard]},
  {path:'parte5', component:Parte5Component, canActivate: [userGuard]},
  // {path:'admin-personalizados', component:AdminPaquetesPersoComponent},

  {path:'404', component:Error404PageComponent},
  {path:'**',redirectTo:'404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
