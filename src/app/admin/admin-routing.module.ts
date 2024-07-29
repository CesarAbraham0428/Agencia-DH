import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { AdminPaquetesPersoComponent } from './pages/admin-paquetes-perso/admin-paquetes-perso.component';
import { AdminTransportistaComponent } from './pages/admin-transportista/admin-transportista.component';
import { AdminAtractivosTuristComponent } from './pages/admin-atractivos-turist/admin-atractivos-turist.component';
import { AdminGuiasComponent } from './pages/admin-guias/admin-guias.component';
import { AdminHosteleriaComponent } from './pages/admin-hosteleria/admin-hosteleria.component';
import { AdminUsuarioComponent } from './pages/admin-usuario/admin-usuario.component';




const routes: Routes = [
  { path: '', component:LayoutPageComponent,
  children:[
    {path: 'admin-personalizados',component:AdminPaquetesPersoComponent},
    {path: 'admin-transportista',component:AdminTransportistaComponent},
    {path: 'admin-atractivos',component:AdminAtractivosTuristComponent},
    {path: 'admin-guias',component:AdminGuiasComponent},
    {path: 'admin-hosteleria',component:AdminHosteleriaComponent},
    {path: 'admin-usuario',component:AdminUsuarioComponent},
    {path:'**',redirectTo:'admin-personalizados'},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
