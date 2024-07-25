import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transportista } from '../../../interfaces/transportista.interface';
import { TransportistaService } from '../../../core/services/transportista.service';

@Component({
  selector: 'app-admin-transportista',
  templateUrl: './admin-transportista.component.html',
  styleUrls: ['./admin-transportista.component.scss']
})
export class AdminTransportistaComponent implements OnInit {
  transportistas: Transportista[] = [];
  transportistaForm!: FormGroup;
  isEditing: boolean = false;
  currentEditIndex: number | null = null;

  constructor(
    private transportistaService: TransportistaService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.transportistaForm = this.fb.group({
      nom_trans: ['', Validators.required],
      apellidos_trans: ['', Validators.required],
      alcance_trans: ['', Validators.required],
      email_trans: ['', [Validators.required, Validators.email]],
      tarifa_trans: ['', [Validators.required, Validators.min(1)]],
      servicios_trans: ['', Validators.required],
      tel_trans: ['', Validators.required]
    });
    this.loadTransportistas();
  }

  loadTransportistas(): void {
  }

  edit(index: number): void {
    const transportista = this.transportistas[index];
    this.transportistaForm.patchValue(transportista);
    this.isEditing = true;
    this.currentEditIndex = index;
  }

  save(): void {
    if (this.transportistaForm.valid) {
      const transportista = this.transportistaForm.value;
      if (this.isEditing && this.currentEditIndex !== null) {
        // Actualizar
        const index = this.currentEditIndex;
        this.transportistaService.updateTransportista(index, transportista).subscribe(() => {
          this.transportistas[index] = transportista;
          this.clearForm();
        });
      } else {
        // Agregar
        this.transportistaService.insertarTransportista(transportista).subscribe((newTransportista) => {
          this.transportistas.push(newTransportista);
          this.clearForm();
        });
      }
    } else {
      console.error('Todos los campos deben ser completados para guardar.');
    }
  }

  deleteRow(index: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este transportista?')) {
      const transportista = this.transportistas[index];
      const id = transportista;
      this.transportistaService.deleteTransportista(id).subscribe(() => {
        this.transportistas.splice(index, 1);
      });
    }
  }

  clearForm(): void {
    this.transportistaForm.reset();
    this.isEditing = false;
    this.currentEditIndex = null;
  }
}
