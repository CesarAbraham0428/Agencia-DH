import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestorRoutingModule } from './gestor-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { AdministradoresComponent } from './pages/administradores/administradores.component';
import { AgenciasComponent } from './pages/agencias/agencias.component';

//parte del CRUD
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    LayoutPageComponent,
    AdministradoresComponent,
    AgenciasComponent
  ],
  imports: [
    CommonModule,
    GestorRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,

  ],
  providers: [

  ]
})
export class GestorModule { }
