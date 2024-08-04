import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

/* Importaciones de Angular Material */

import { MaterialModule } from '../material/material.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

/* Validar Furmularios */

import { ReactiveFormsModule,FormsModule  } from '@angular/forms';


import { AdminTransportistaComponent } from './pages/admin-transportista/admin-transportista.component';
import { AdminHosteleriaComponent } from './pages/admin-hosteleria/admin-hosteleria.component';
import { AdminGuiasComponent } from './pages/admin-guias/admin-guias.component';
import { AdminAtractivosTuristComponent } from './pages/admin-atractivos-turist/admin-atractivos-turist.component';
import { AdminUsuarioComponent } from './pages/admin-usuario/admin-usuario.component';

/* Parte de Craer Paquetes  */

import { CraerPaquetesComponent } from './pages/crear-paquetes/crear-paquetes.component';

import { PaquetesComponent } from './pages/paquetes/paquetes.component';
import { ContenidoPaqueteComponent } from './pages/crear-paquetes/contenido-paquete/contenido-paquete.component';
import { AcordeonPaqueteComponent } from './pages/crear-paquetes/acordeon-paquete/acordeon-paquete.component';
import { CrearItinerarioComponent } from './pages/crear-paquetes/crear-itinerario/crear-itinerario.component';
import { PasosNavegacionComponent } from './pages/crear-paquetes/pasos-navegacion/pasos-navegacion.component';
import { CustomTimePipe } from './pages/paquetes/time.pipe';
import { ConsultasComponent } from './pages/consultas/consultas.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    CraerPaquetesComponent,
    ContenidoPaqueteComponent,
    AcordeonPaqueteComponent,
    CrearItinerarioComponent,
    PasosNavegacionComponent,
    AdminTransportistaComponent,
    AdminHosteleriaComponent,
    AdminGuiasComponent,
    AdminAtractivosTuristComponent,
    PaquetesComponent,
    AdminUsuarioComponent,
    CustomTimePipe,
    ConsultasComponent,
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    NgxMaterialTimepickerModule,
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
