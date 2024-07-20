import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { PredeterminadoComponent } from './pages/paquetes/predeterminado/predeterminado.component';
import { PaquetesPersonalizadosComponent } from './pages/paquetes-personalizados/paquetes-personalizados.component';
import { Parte2Component } from './pages/paquetes-personalizados/parte2/parte2.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminPaquetesPersoComponent } from './pages/admin-paquetes-perso/admin-paquetes-perso.component';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { loginGuard } from './guard/auth.guard';

const routes: Routes = [
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  {path: 'inicio', component: InicioComponent },
  {path: '', redirectTo: '/inicio', pathMatch: 'full' },
  {path:'registro', component:RegistroComponent},
  {path:'login', component:LoginComponent},
  {path:'paquetes', component:PredeterminadoComponent},
  {path: 'paquetes-personalizados',component:PaquetesPersonalizadosComponent,canActivate: [loginGuard]} ,
  {path:'parte2', component:Parte2Component,canActivate: [loginGuard]},

  {path:'admin-personalizados', component:AdminPaquetesPersoComponent}, //poner guards de admin

  {path:'404', component:Error404PageComponent},
  {path:'**',redirectTo:'404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
