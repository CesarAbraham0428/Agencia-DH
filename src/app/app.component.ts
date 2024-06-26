import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'agencia-dh';
  menuActive: boolean = false;

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }


  constructor (private router:Router ) {}

  registrarse(){
    this.router.navigate(['registro'])
  }

}
