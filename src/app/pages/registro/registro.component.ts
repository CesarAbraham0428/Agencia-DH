import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroService } from '../../services/auth.service';
import { Usuario } from '../../interfaces/usuario.interface';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'] // Corrected to styleUrls
})
export class RegistroComponent implements OnInit {
  registroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registroService: RegistroService
  ) {}

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nom_usr: ['', Validators.required],
      app_usr: ['', Validators.required],
      passwd_usr: ['', Validators.required],
      nacionalidad_usr: ['', Validators.required],
      sexo_usr: ['', Validators.required],
      edad_usr: ['', Validators.required],
      email_usr: ['', [Validators.required, Validators.email]],
      id_ciudad: ['', Validators.required]
    });
  }

  async registrarUsuario(): Promise<void> {
    if (this.registroForm.valid) {
      const usuario: Usuario = this.registroForm.value;
      try {
        const response = await firstValueFrom(this.registroService.registrarUsuario(usuario));
        console.log('Usuario registrado:', response);
        this.registroForm.reset(); // Reset the form after successful registration
      } catch (error) {
        console.error('Error al registrar usuario:', error);
        // Handle error cases as needed
      }
    } else {
      console.error('Formulario inválido. Revise los campos.');
      this.registroForm.markAllAsTouched(); // Optionally mark fields as touched to show validation errors
    }
  }
}
