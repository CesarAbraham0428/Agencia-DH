import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent implements OnInit{

  formReg: FormGroup;

  constructor (
    private router:Router
  ){
    this.formReg = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')

    });
  }

  ngOnInit(): void {
  }

}
