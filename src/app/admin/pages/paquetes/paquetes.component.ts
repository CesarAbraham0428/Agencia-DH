import { Component, OnInit } from '@angular/core';
import { ServicioGenericoCRUD } from '../../../core/services/CRUDS/crud-servicio.service';
import { Paquete } from '../../../interfaces/CRUDS/tablas.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

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
      const paqueteActualizado = {
        nom_paquete: this.paqueteForm.get('nom_paquete')?.value,
        tipo_paquete: this.paqueteForm.get('tipo_paquete')?.value,
        costo_paquete: this.paqueteForm.get('costo_paquete')?.value
      };

      this.genericService.update('update-paquete', this.editingPaquete.id_paquete, paqueteActualizado).subscribe(
        (response) => {
          if (response && response.message === 'Paquete actualizado correctamente') {
            Swal.fire({
              icon: 'success',
              title: '¡Éxito!',
              text: 'El paquete se ha actualizado correctamente.',
            });
            this.cargarPaquetes();
            this.cancelarEdicion();
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un problema al actualizar el paquete.',
            });
          }
        },
        error => {
          console.error('Error al actualizar el paquete:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo actualizar el paquete. Por favor, intenta de nuevo.',
          });
        }
      );
    }
  }

  eliminarPaquete(paquete: Paquete) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar el paquete "${paquete.nom_paquete}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.genericService.delete('Paquete', paquete.id_paquete).subscribe(
          (response) => {
            if (response && response.message === 'Paquete eliminado exitosamente') {
              Swal.fire(
                '¡Eliminado!',
                'El paquete ha sido eliminado correctamente.',
                'success'
              );
              this.cargarPaquetes();
            } else {
              Swal.fire(
                'Error',
                'Hubo un problema al eliminar el paquete.',
                'error'
              );
            }
          },
          error => {
            console.error('Error al eliminar el paquete:', error);
            Swal.fire(
              'Error',
              'No se pudo eliminar el paquete. Por favor, intenta de nuevo.',
              'error'
            );
          }
        );
      }
    });
  }

  cancelarEdicion() {
    this.editingPaquete = null;
    this.paqueteForm.reset();
    this.showEditForm = false;
  }

}