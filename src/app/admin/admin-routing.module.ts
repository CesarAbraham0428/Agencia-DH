import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { AdminPaquetesPersoComponent } from './pages/admin-paquetes-perso/admin-paquetes-perso.component';
import { Parte3Component } from '../pages/paquetes-personalizados/parte3/parte3.component';
import { Parte4Component } from '../pages/paquetes-personalizados/parte4/parte4.component';
import { Parte5Component } from '../pages/paquetes-personalizados/parte5/parte5.component';

const routes: Routes = [
  { path: '', component:LayoutPageComponent,
  children:[
    {path: 'admin-personalizados',component:AdminPaquetesPersoComponent},
    {path: 'parte3',component:Parte3Component},
    {path: 'parte4',component:Parte4Component},
    {path: 'parte5',component:Parte5Component},
    {path:'**',redirectTo:'admin-personalizados'},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
