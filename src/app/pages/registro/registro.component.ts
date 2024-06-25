import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {


  constructor (private router:Router) {}

  iniciarSesion(){
    this.router.navigate([''])
  }


}
