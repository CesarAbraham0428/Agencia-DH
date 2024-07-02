import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  formReg: FormGroup;


  constructor (
    private UserService: UserService,
    private router:Router
  ){
    this.formReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl()

    });
  }


  ngOnInit(): void {
    
  }
  
  onSubmit(){
    this.UserService.login(this.formReg.value)
    .then(response => {
      console.log(response);
    })

    this.router.navigate([''])

    .catch(error => console.log(error))
  }

  registrarse(){
    this.router.navigate(['/registro'])
  }

}
