import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroService } from '../../core/services/auth.service';
import { Usuario } from '../../interfaces/usuario.interface';
import { firstValueFrom } from 'rxjs';
import { MustMatch } from '../../validators/must-match.validator';
import { COUNTRY_CITY_DATA} from '../../data/country-city-data';
import { Router } from '@angular/router';
import { DialogContentExampleDialog } from '../../shared/directives/dialog-content/dialog-content.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'] // Corrected to styleUrls
})
export class RegistroComponent implements OnInit {
  registroForm!: FormGroup;
  countries: string[] = Object.keys(COUNTRY_CITY_DATA);
  cities: string[] = [];



  constructor(
    private fb: FormBuilder,
    private registroService: RegistroService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nom_usr: ['', Validators.required],
      app_usr: ['', Validators.required],
      passwd_usr: ['', Validators.required],
      confirm_passwd_usr: ['', Validators.required,],
      nacionalidad_usr: ['', Validators.required],
      sexo_usr: ['', Validators.required],
      edad_usr: ['', [Validators.required, Validators.min(5)]],
      email_usr: ['', [Validators.required, Validators.email]],
      ciudad_usr: ['', Validators.required]
    },{
      validators: MustMatch('passwd_usr', 'confirm_passwd_usr')
    });

    this.registroForm.get('nacionalidad_usr')?.valueChanges.subscribe(country => {
      this.updateCities(country);
    });
  }

  updateCities(country: string): void {
    this.cities = COUNTRY_CITY_DATA[country] || [];
    this.registroForm.get('id_ciudad')?.setValue('');
  }

  async registrarUsuario(): Promise<void> {
    if (this.registroForm.valid) {
      const usuario: Usuario = this.registroForm.value;
      try {
        await firstValueFrom(this.registroService.registrarUsuario(usuario));
        Swal.fire({
          title: "!Hecho!",
          text: "Usuario registrado, confirmar correo.",
          icon: "success"
        });
        this.registroForm.reset();
        this.router.navigate(['/inicio']);
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Error al registrar usuario, el correo está en uso.",
          icon: "error"
        });
      }
    } else {
      Swal.fire({
        title: "Error!",
        text: "Formulario inválido. Revise los campos.",
        icon: "error"
      });
      this.registroForm.markAllAsTouched();
    }
  }

  hasErrors(controlName: string, errorName: string): boolean {
    const control = this.registroForm.get(controlName);
    return control ? control.hasError(errorName) && control.touched : false;
  }

}

