import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';

/* Importaciones de Angular Material */

import { MaterialModule } from '../material/material.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';


import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; 


/* Parte de Paquetes personalizados */

import { AdminPaquetesPersoComponent } from './pages/admin-paquetes-perso/admin-paquetes-perso.component';
import { ContenidoPaqueteComponent } from './pages/admin-paquetes-perso/contenido-paquete/contenido-paquete.component';
import { AcordeonPaqueteComponent } from './pages/admin-paquetes-perso/acordeon-paquete/acordeon-paquete.component';
import { AcordeonExperienciasComponent } from './pages/admin-paquetes-perso/acordeon-experiencias/acordeon-experiencias.component';
import { CrearItinerarioComponent } from './pages/admin-paquetes-perso/crear-itinerario/crear-itinerario.component';
import { PasosNavegacionComponent } from './pages/admin-paquetes-perso/pasos-navegacion/pasos-navegacion.component';
import { ModalMaterialComponent } from './pages/admin-paquetes-perso/modal-material/modal-material.component';



@NgModule({
  declarations: [
    LayoutPageComponent,
    AdminPaquetesPersoComponent,
    ContenidoPaqueteComponent,
    AcordeonPaqueteComponent,
    AcordeonExperienciasComponent,
    CrearItinerarioComponent,
    PasosNavegacionComponent,
    ModalMaterialComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule 
  ]
})
export class AdminModule { }
