import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { AdminPaquetesPersoComponent } from './pages/admin-paquetes-perso/admin-paquetes-perso.component';

const routes: Routes = [
  { path: '', component:LayoutPageComponent,
  children:[
    {path: 'admin-personalizados',component:AdminPaquetesPersoComponent},
    {path:'**',redirectTo:'admin-personalizados'},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
