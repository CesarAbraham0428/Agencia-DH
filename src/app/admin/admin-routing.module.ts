import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { CraerPaquetesComponent } from './pages/crear-paquetes/crear-paquetes.component';
import { PaquetesComponent } from './pages/paquetes/paquetes.component';

const routes: Routes = [
  { path: '', component:LayoutPageComponent,
  children:[
    {path: 'crear-paquetes',component:CraerPaquetesComponent},
    {path:'paquetes', component:PaquetesComponent},
    {path:'**',redirectTo:'crear-paquetes'},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
