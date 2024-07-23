import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { AdminPaquetesPersoComponent } from './pages/admin-paquetes-perso/admin-paquetes-perso.component';
import { AdminExperienciasComponent } from './pages/admin-experiencias/admin-experiencias.component';
import { AdminServiciosComponent } from './pages/admin-servicios/admin-servicios.component';



const routes: Routes = [
  { path: '', component:LayoutPageComponent,
  children:[
    {path: 'admin-personalizados',component:AdminPaquetesPersoComponent},
    {path: 'admin-servicios',component:AdminServiciosComponent},
    {path: 'admin-experiencias',component:AdminExperienciasComponent},
    {path:'**',redirectTo:'admin-personalizados'},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
