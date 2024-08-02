import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ServicioGenericoCRUD } from '../../../core/services/CRUDS/crud-servicio.service';
import { UsuariosService } from '../../../core/services/usuarios.service'; // Asegúrate de que la ruta sea correcta
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
  usuarios: any[] = []; // Cambiamos el tipo a 'any' para coincidir con la respuesta del servicio
  
  paquetesFiltrados: any[] = [];
  paqueteForm!: FormGroup;
  editingPaquete: Paquete | null = null;
  showEditForm: boolean = false;

  filtroTipo: string = 'todos';
  filtroCostoMin: number | null = null;
  filtroCostoMax: number | null = null;

  constructor(
    private genericService: ServicioGenericoCRUD,
    private usuariosService: UsuariosService, // Inyectamos el nuevo servicio
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.paqueteForm = this.fb.group({
      nom_paquete: ['', Validators.required],
      tipo_paquete: ['', Validators.required],
      costo_paquete: ['', [Validators.required, Validators.min(1)]]
    });
  }
  ngOnInit(): void {
    this.cargarUsuarios();
    this.cargarPaquetes();
  }

  cargarPaquetes() {
    this.genericService.getAll<Paquete>('Paquete').subscribe(
      data => {
        this.paquetes = data;
        this.paquetes.forEach(paquete => {
          this.genericService.getPaqueteCompleto(paquete.id_paquete).subscribe(
            paqueteCompleto => {
              Object.assign(paquete, paqueteCompleto);
              console.log('Paquete completo cargado:', paquete);
            },
            error => {
              console.error('Error al obtener paquete completo:', error);
            }
          );
        });
        this.filtrarPaquetes();
      },
      error => {
        console.error('Error al obtener Paquetes:', error);
      }
    );
  }

  cargarUsuarios() {
    this.usuariosService.getAllUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        console.log('Usuarios cargados en el componente:', this.usuarios);
        if (this.usuarios.length === 0) {
          console.log('No se encontraron usuarios con rol "usuario"');
        }
      },
      error: (error) => {
        console.error('Error al obtener Usuarios:', error);
      }
    });
  }


  filtrarPaquetes() {
    this.paquetesFiltrados = this.paquetes.filter(paquete => {
      const cumpleTipo = this.filtroTipo === 'todos' || paquete.tipo_paquete === this.filtroTipo;
      const cumpleCostoMin = this.filtroCostoMin === null || paquete.costo_paquete >= this.filtroCostoMin;
      const cumpleCostoMax = this.filtroCostoMax === null || paquete.costo_paquete <= this.filtroCostoMax;
      return cumpleTipo && cumpleCostoMin && cumpleCostoMax;
    });
  }


  asignarPaquete(paquete: any) {
    if (this.usuarios.length === 0) {
      console.log('No hay usuarios disponibles para asignar el paquete');
      // Aquí puedes mostrar un mensaje al usuario si lo deseas
      return;
    }
  
    Swal.fire({
      title: 'Asignar Paquete',
      html: `
        <select id="usuario" class="swal2-select">
          <option value="">Seleccione un usuario</option>
          ${this.usuarios.map(u => `<option value="${u.id_usr}">${u.nom_usr}</option>`).join('')}
        </select>
      `,
      showCancelButton: true,
      confirmButtonText: 'Asignar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const selectElement = document.getElementById('usuario') as HTMLSelectElement;
        console.log('Elemento select:', selectElement);
        console.log('Opciones disponibles:', Array.from(selectElement.options).map(opt => ({ value: opt.value, text: opt.text })));
        console.log('Valor seleccionado:', selectElement.value);
        return selectElement.value;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Resultado de la selección:', result.value);
        
        if (!result.value) {
          Swal.fire('Error', 'Debe seleccionar un usuario', 'error');
          return;
        }
  
        const id_usr = parseInt(result.value as string);
        console.log('id_usr parseado:', id_usr);
        
        if (isNaN(id_usr)) {
          console.error('ID de usuario inválido');
          Swal.fire('Error', 'ID de usuario inválido', 'error');
          return;
        }
  
        const asignacion = {
          id_paquete: paquete.id_paquete,
          id_usr: id_usr
        };
  
        console.log('Enviando asignación:', asignacion);
  
        this.genericService.asignarUsuarioPaquete(asignacion).subscribe(
          response => {
            console.log('Asignación exitosa', response);
            Swal.fire('Éxito', 'Paquete asignado correctamente', 'success');
          },
          error => {
            console.error('Error al asignar paquete:', error);
            Swal.fire('Error', 'No se pudo asignar el paquete. ' + (error.error?.error || ''), 'error');
          }
        );
      }
    });
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
  
      this.genericService.update(this.editingPaquete.id_paquete, paqueteActualizado).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'El paquete se ha actualizado correctamente.',
          });
          this.cargarPaquetes();
          this.cancelarEdicion();
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