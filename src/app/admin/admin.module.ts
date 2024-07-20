import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { AdminPaquetesPersoComponent } from './pages/admin-paquetes-perso/admin-paquetes-perso.component';
import { ContenidoPaqueteComponent } from './pages/admin-paquetes-perso/contenido-paquete/contenido-paquete.component';
import { AcordeonPaqueteComponent } from './pages/admin-paquetes-perso/acordeon-paquete/acordeon-paquete.component';
import { AcordeonExperienciasComponent } from './pages/admin-paquetes-perso/acordeon-experiencias/acordeon-experiencias.component';



@NgModule({
  declarations: [
    LayoutPageComponent,
    AdminPaquetesPersoComponent,
    ContenidoPaqueteComponent,
    AcordeonPaqueteComponent,
    AcordeonExperienciasComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ]
})
export class AdminModule { }
