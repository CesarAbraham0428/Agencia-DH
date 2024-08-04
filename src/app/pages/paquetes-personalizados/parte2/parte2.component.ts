import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../core/services/login.service';
import { firstValueFrom } from 'rxjs';
import { ConsultaService } from '../../../core/services/consulta.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-parte2',
  templateUrl: './parte2.component.html',
  styleUrls: ['./parte2.component.scss'] // Corregido a styleUrls
})
export class Parte2Component implements OnInit {
  agencias: any[] = [];
  hoteles: any[] = [];
  restaurantes: any[] = [];
  experiencias: any[] = [];
  consultaForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminService: LoginService,
    private consultaService: ConsultaService,
    public router: Router
  ){
    this.consultaForm = this.fb.group ({
      nom_agencia:['', Validators.required],
      llegada_cons:['', Validators.required],
      salida_cons:['', Validators.required],
      adults_18_36:[0],
      adults_37_64:[0],
      ninos_0_8:[0],
      ninos_9_17:[0],
      travel_with:['', Validators.required],
      budget:['', Validators.required],
      actividades:['', Validators.required],
      lugar_deseado:['', Validators.required],
      hotel:['', Validators.required],
      restaurante:['', Validators.required],
      experiencia:['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAgencias();
    this.loadHoteles();
    this.loadRestaurantes();
    this.loadExperiencias();
  }

  async enviarConsulta(): Promise<void> {
    if (this.consultaForm.valid) {
      try {
        await firstValueFrom(this.consultaService.enviarConsulta(this.consultaForm.value));
        Swal.fire({
          title: "!Hecho!",
          text: "Información enviada",
          icon: "success"
        });
        this.consultaForm.reset();
        this.router.navigate(['/inicio']);
      } catch (error: any) {
        let errorMessage = "Error en el formulario";
        if (error.status === 429) {
          errorMessage = "Solo puedes enviar una consulta cada semana.";
        }
        Swal.fire({
          title: "Error!",
          text: errorMessage,
          icon: "error"
        });
      }
    } else {
      Swal.fire({
        title: "Error!",
        text: "Formulario inválido. Revise los campos.",
        icon: "error"
      });
      this.consultaForm.markAllAsTouched();
    }
  }


  loadAgencias(): void {
    // Asumiendo que tienes un servicio que obtiene las agencias
    this.adminService.getAllAgencias().subscribe(data => {
      this.agencias = data;
    });
  }

  loadHoteles(): void {
    this.adminService.getAllHoteles().subscribe(data => {
      this.hoteles = data;
    })
  }

  loadRestaurantes(): void {
    this.adminService.getAllRestaurantes().subscribe(data => {
      this.restaurantes = data;
    })
  }

  loadExperiencias(): void {
    this.adminService.getAllExperiencias().subscribe(data => {
      this.experiencias = data;
    });
  }
}
