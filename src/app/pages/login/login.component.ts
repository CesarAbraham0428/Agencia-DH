import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../core/services/login.service';
import { Router } from '@angular/router';
import { DialogContentExampleDialog } from '../../shared/directives/dialog-content/dialog-content.component';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';


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
    private router: Router,
    public dialog: MatDialog
  ){}


  ngOnInit(): void {
    this.formLog = this.form.group({
      email_usr: ['', [Validators.required, Validators.email]],
      passwd_usr: ['', [Validators.required, Validators.minLength(6)]]
    })

  }

  async onSubmit(): Promise<void> {
    if (this.formLog.valid) {
      const { email_usr, passwd_usr } = this.formLog.value;
      try {
        await firstValueFrom(this.loginService.loginUsuario(email_usr, passwd_usr));
        const userRole = localStorage.getItem('userRole');
        this.formLog.reset();

        this.dialog.open(DialogContentExampleDialog, {
          width: '250px',
          data: { message: 'Inicio de sesión exitoso' }
        });

        if (userRole === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/inicio']);
        }
      } catch (error) {
        this.dialog.open(DialogContentExampleDialog, {
          width: '250px',
          data: { message: 'Contraseña o correo incorrectos' }
        });
      }
    } else {
      this.dialog.open(DialogContentExampleDialog, {
        width: '250px',
        data: { message: 'Formulario inválido. Revise los campos.' }
      });
      this.formLog.markAllAsTouched();
    }
  }


  hasErrors(controlName: string, errorName: string): boolean {
    const control = this.formLog.get(controlName);
    return control ? control.hasError(errorName) && control.touched : false;
  }
}
