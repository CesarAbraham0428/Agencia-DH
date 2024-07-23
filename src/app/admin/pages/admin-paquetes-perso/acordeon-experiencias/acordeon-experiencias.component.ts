import { Component, OnInit } from '@angular/core';
import { PackageDataService } from '../../../../core/services/admin-crear-paquete.service';
import { RestauranteService } from '../../../../core/services/CRUDS/crud-restaurantes.service';

@Component({
  selector: 'app-acordeon-experiencias',
  templateUrl: './acordeon-experiencias.component.html',
  styleUrl: './acordeon-experiencias.component.scss'
})
export class AcordeonExperienciasComponent implements OnInit {

  restaurantes: any[] = [];

  constructor(
    private packageDataService: PackageDataService,
    private restauranteService: RestauranteService
  ) {}


  ngOnInit() {
    this.restauranteService.getRestaurantes().subscribe(
      data => {
        this.restaurantes = data;
      },
      error => {
        console.error('Error al obtener restaurantes:', error);
      }
    );
  }  

  selectItem(restaurante: any) {
    this.packageDataService.addItem('experiencia', restaurante);
  }
    
  deselectItem(restaurante: any) {
    this.packageDataService.removeItem('experiencia', restaurante);
  }
  
  
}