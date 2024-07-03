import { Component } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'agencia-dh';

  constructor(
    private userService: UserService,
    private router: Router
  ){

  }

  // Código para ocultar y visualizar el menu de navegación

  menuActive: boolean = false;

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }


  CerrarSesion(){
    this.userService.logout()
    .then(()=>{
        this.router.navigate(['']);

        
    })

    .catch(error => console.log(error))
  }



}
