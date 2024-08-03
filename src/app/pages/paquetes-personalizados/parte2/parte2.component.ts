import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../core/services/login.service';

@Component({
  selector: 'app-parte2',
  templateUrl: './parte2.component.html',
  styleUrls: ['./parte2.component.scss'] // Corregido a styleUrls
})
export class Parte2Component implements OnInit {
  agencias: any[] = [];
  hoteles: any[] = [];
  resutaurantes: any[] = [];

  constructor(
    private adminService: LoginService,
  ){}

  ngOnInit(): void {
    this.loadAgencias(); // Cargar agencias para el select
    this.loadHoteles()
  }

  loadAgencias(): void {
    // Asumiendo que tienes un servicio que obtiene las agencias
    this.adminService.getAllAgencias().subscribe(data => {
      this.agencias = data;
    });
  }

  loadHoteles(): void {
    this.adminService.getAllHoteles().subscribe(data => {
      this.hoteles = data;
    })
  }

  loadRestaurantes(): void {
    this.adminService.getAllRestaurantes().subscribe(data => {
      this.resutaurantes = data;
    })
  }
}
