import { Component, OnInit } from '@angular/core';
import { HosteleriaService } from '../../../core/services/hosteleria.service';

@Component({
  selector: 'app-parte4',
  templateUrl: './parte4.component.html',
  styleUrl: './parte4.component.scss'
})
export class Parte4Component implements OnInit{
  restaurantes: any[]=[];

  constructor(
    private restaurantService: HosteleriaService,
  ){}

  ngOnInit(): void {
    this.loadRestaurante();
  }

  loadRestaurante(){
  this.restaurantService.getAllHostelerias().subscribe(
    (data) => {
      this.restaurantes = data.filter((h: { tipo_hs: string; }) => h.tipo_hs === 'Restaurante');
      console.log(this.restaurantes)
    },
    (error) => {
      console.error('Error al cargar hostelería:', error);
    }
  );
  }
}
