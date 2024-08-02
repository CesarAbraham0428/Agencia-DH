import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { AdministradoresComponent } from './pages/administradores/administradores.component';
import { AgenciasComponent } from './pages/agencias/agencias.component';

const routes: Routes = [
  {
    path: '', component:LayoutPageComponent,
  children:[
    {path: 'administradores-CRUD',component:AdministradoresComponent},
    {path: 'agencias-CRUD',component:AgenciasComponent},
    {path:'**',redirectTo:'administradores-CRUD'},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestorRoutingModule { }
