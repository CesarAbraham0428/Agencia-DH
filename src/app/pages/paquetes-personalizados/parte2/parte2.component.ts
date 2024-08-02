import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../core/services/login.service';

@Component({
  selector: 'app-parte2',
  templateUrl: './parte2.component.html',
  styleUrl: './parte2.component.scss'
})
export class Parte2Component implements OnInit{
  agencias: any[] = []

  constructor(
    private adminService: LoginService,
  ){}

  ngOnInit(): void {
    this.loadAgencias(); // Cargar agencias para el select
  }

  loadAgencias(): void {
    // Asumiendo que tienes un servicio que obtiene las agencias
    this.adminService.getAllAgencias().subscribe(data => {
      this.agencias = data;
    });
  }
}
