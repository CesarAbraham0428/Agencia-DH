import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ReactiveFormsModule,FormsModule  } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

/* Parte de Paquetes personalizados */

import { AdminPaquetesPersoComponent } from './pages/admin-paquetes-perso/admin-paquetes-perso.component';
import { ContenidoPaqueteComponent } from './pages/admin-paquetes-perso/contenido-paquete/contenido-paquete.component';
import { AcordeonPaqueteComponent } from './pages/admin-paquetes-perso/acordeon-paquete/acordeon-paquete.component';
import { AcordeonExperienciasComponent } from './pages/admin-paquetes-perso/acordeon-experiencias/acordeon-experiencias.component';
import { CrearItinerarioComponent } from './pages/admin-paquetes-perso/crear-itinerario/crear-itinerario.component';
import { PasosNavegacionComponent } from './pages/admin-paquetes-perso/pasos-navegacion/pasos-navegacion.component';
import { AdminTransportistaComponent } from './pages/admin-transportista/admin-transportista.component';
import { AdminHosteleriaComponent } from './pages/admin-hosteleria/admin-hosteleria.component';
import { AdminGuiasComponent } from './pages/admin-guias/admin-guias.component';
import { AdminAtractivosTuristComponent } from './pages/admin-atractivos-turist/admin-atractivos-turist.component';



@NgModule({
  declarations: [
    LayoutPageComponent,
    AdminPaquetesPersoComponent,
    ContenidoPaqueteComponent,
    AcordeonPaqueteComponent,
    AcordeonExperienciasComponent,
    CrearItinerarioComponent,
    PasosNavegacionComponent,
    AdminTransportistaComponent,
    AdminHosteleriaComponent,
    AdminGuiasComponent,
    AdminAtractivosTuristComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    NgxMaterialTimepickerModule,
  ]
})
export class AdminModule { }
