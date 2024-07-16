import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../core/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  formLog!: FormGroup;

  constructor (
    private form: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ){}


  ngOnInit(): void {
    this.formLog = this.form.group({
      email_usr: ['', [Validators.required, Validators.email]],
      passwd_usr: ['', [Validators.required, Validators.minLength(6)]]
    })

  }

  onSubmit(): void {
    if (this.formLog.valid) {
      const { email_usr, passwd_usr } = this.formLog.value;
      this.loginService.loginUsuario(email_usr, passwd_usr).subscribe(
        response => {
          // console.log('Login successful', response);
          // Navegar a otra ruta en caso de éxito, por ejemplo, a la página principal
          this.router.navigate(['/inicio']);
        },
        error => {
          // console.error('Login failed', error);
          // Manejar el error, mostrar un mensaje al usuario, etc.
        }
      );
    }
  }

  hasErrors(controlName: string, errorName: string): boolean {
    const control = this.formLog.get(controlName);
    return control ? control.hasError(errorName) && control.touched : false;
  }
}
