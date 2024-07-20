import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroService } from '../../core/services/auth.service';
import { Usuario } from '../../interfaces/usuario.interface';
import { firstValueFrom } from 'rxjs';
import { MustMatch } from '../../validators/must-match.validator';
import { COUNTRY_CITY_DATA} from '../../data/country-city-data';
import { Router } from '@angular/router';

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
    private router: Router
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
        const response = await firstValueFrom(this.registroService.registrarUsuario(usuario));
        // console.log('Usuario registrado:', response);
        alert('Usuario registrado, confirmar correo');
        this.registroForm.reset();
        this.router.navigate(['/inicio']);
      } catch (error) {
        // console.error('Error al registrar usuario:', error);
        alert('Error al registrar usuario');
      }
    } else {
      // console.error('Formulario inválido. Revise los campos.');
      alert('Formulario inválido. Revise los campos.');
      this.registroForm.markAllAsTouched();
    }
  }

}

