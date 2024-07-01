import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { response } from 'express';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent implements OnInit{

  formReg: FormGroup;

  constructor (
    private UserService: UserService,
    private router:Router
  ){
    this.formReg = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')

    });
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.UserService.register(this.formReg.value)
    .then(response => {
      console.log(response);
    })
  }

  iniciarSesion(){
    this.router.navigate([''])
  }

}
