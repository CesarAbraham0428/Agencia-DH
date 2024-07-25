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

/* Validar Furmularios */
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; 


/* Parte de Craer Paquetes  */

import { CraerPaquetesComponent } from './pages/crear-paquetes/crear-paquetes.component';
import { ContenidoPaqueteComponent } from './pages/crear-paquetes/contenido-paquete/contenido-paquete.component';
import { AcordeonPaqueteComponent } from './pages/crear-paquetes/acordeon-paquete/acordeon-paquete.component';
import { CrearItinerarioComponent } from './pages/crear-paquetes/crear-itinerario/crear-itinerario.component';
import { PasosNavegacionComponent } from './pages/crear-paquetes/pasos-navegacion/pasos-navegacion.component';
import { PaquetesComponent } from './pages/paquetes/paquetes.component';



@NgModule({
  declarations: [
    LayoutPageComponent,
    CraerPaquetesComponent,
    ContenidoPaqueteComponent,
    AcordeonPaqueteComponent,
    CrearItinerarioComponent,
    PasosNavegacionComponent,
    PaquetesComponent,
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
