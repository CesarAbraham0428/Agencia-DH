import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  formLog: FormGroup;
  
  email: string = '';
  password: string= '';


  constructor (
    private form: FormBuilder
  ){
    this.formLog = this.form.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]

    });
  }


  ngOnInit(): void {
    this.formLog.patchValue({
      email: this.email,
      password: this.password
    })
    
  }

  hasErrors(controlName: string, errorType: string){
    return this.formLog.get(controlName)?.hasError(errorType) && this.formLog.get(controlName)?.touched
  }
  


}
