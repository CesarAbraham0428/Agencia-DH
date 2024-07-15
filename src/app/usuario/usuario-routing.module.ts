import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioDashboardComponent } from './pages/usuario-dashboard/usuario-dashboard.component';
import { UsuarioProfileComponent } from './pages/usuario-profile/usuario-profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: UsuarioDashboardComponent },
  { path: 'perfil', component: UsuarioProfileComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
