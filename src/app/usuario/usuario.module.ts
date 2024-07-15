import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioDashboardComponent } from './pages/usuario-dashboard/usuario-dashboard.component';
import { UsuarioProfileComponent } from './pages/usuario-profile/usuario-profile.component';


@NgModule({
  declarations: [
    UsuarioDashboardComponent,
    UsuarioProfileComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule
  ]
})
export class UsuarioModule { }
