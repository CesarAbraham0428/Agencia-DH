import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

constructor (private router:Router ) {}

  registrarse(){
    this.router.navigate(['registro'])
  }

  login(form:NgForm){

    const email= form.value.email

    const password = form.value.password

  }

}
