import { Component, OnInit } from '@angular/core';
import { ServicioGenericoCRUD } from '../../../core/services/CRUDS/crud-servicio.service';
import { Paquete } from '../../../interfaces/CRUDS/tablas.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-paquetes',
  templateUrl: './paquetes.component.html',
  styleUrls: ['./paquetes.component.scss']
})
export class PaquetesComponent implements OnInit {

  paquetes: any[] = [];
  paqueteForm!: FormGroup;
  editingPaquete: Paquete | null = null;
  showEditForm: boolean = false;

  constructor(
    private genericService: ServicioGenericoCRUD,
    private fb: FormBuilder
  ) {
    this.paqueteForm = this.fb.group({
      nom_paquete: ['', Validators.required],
      tipo_paquete: ['', Validators.required],
      costo_paquete: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.cargarPaquetes();
  }

  cargarPaquetes() {
    this.genericService.getAll<Paquete>('Paquete').subscribe(
      data => {
        this.paquetes = data;
        this.paquetes.forEach(paquete => {
          this.genericService.getPaqueteCompleto(paquete.id_paquete).subscribe(
            paqueteCompleto => {
              paquete.servicios = paqueteCompleto.servicios;
              paquete.actividades = paqueteCompleto.actividades;
            },
            error => {
              console.error('Error al obtener paquete completo:', error);
            }
          );
        });
      },
      error => {
        console.error('Error al obtener Paquetes:', error);
        if (error.error && error.error.error) {
          console.error('Mensaje de error del servidor:', error.error.error);
        }
      }
    );
  }

  editarPaquete(paquete: Paquete) {
    this.editingPaquete = paquete;
    this.paqueteForm.patchValue({
      nom_paquete: paquete.nom_paquete,
      tipo_paquete: paquete.tipo_paquete,
      costo_paquete: paquete.costo_paquete
    });
    this.showEditForm = true;
  }

  actualizarPaquete() {
    if (this.paqueteForm.valid && this.editingPaquete) {
      const paqueteActualizado: Paquete = {
        ...this.editingPaquete,
        ...this.paqueteForm.value
      };
      this.genericService.update('Paquete', this.editingPaquete.id_paquete, paqueteActualizado).subscribe(
        () => {
          this.cargarPaquetes();
          this.cancelarEdicion();
        },
        error => {
          console.error('Error al actualizar el paquete:', error);
        }
      );
    }
  }

  cancelarEdicion() {
    this.editingPaquete = null;
    this.paqueteForm.reset();
    this.showEditForm = false;
  }

}