import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paquetes-personalizados',
  templateUrl: './paquetes-personalizados.component.html',
  styleUrl: './paquetes-personalizados.component.scss'
})
export class PaquetesPersonalizadosComponent {

  constructor(
    public router: Router
  ){}
}

