import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AtractivosService } from '../../../core/services/atractivos.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/directives/dialog-content/confirm-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-atractivos-turist',
  templateUrl: './admin-atractivos-turist.component.html',
  styleUrl: './admin-atractivos-turist.component.scss'
})
export class AdminAtractivosTuristComponent implements OnInit {
  atraccionForm: FormGroup;
  atracciones: any[] = [];
  isEditing = false;
  editingAtraccionId: number | null = null;

  constructor(private fb: FormBuilder, private atractivosService: AtractivosService,
    public dialog: MatDialog) {
    this.atraccionForm = this.fb.group({
      nom_actur: ['', Validators.required],
      tipo_actur: [''],
      accesbilidad_actur: [''],
      descripcion_actur: [''],
      nom_calle_actur: [''],
      num_calle_actur: [''],
      localidad_actur: [''],
      tipologia_actur: [''],
      num_visitantes_actur: [''],
      categoria_actur: [''],
      servicios_actur: [''],
      costo_actur: ['']
    });
  }

  ngOnInit(): void {
    this.loadAtracciones();
  }

  loadAtracciones(): void {
    this.atractivosService.getAllAtractivos().subscribe((data) => {
      this.atracciones = data;
    });
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.updateAtraccion();
    } else {
      this.createAtraccion();
    }
  }

  createAtraccion(): void {
    if (this.atraccionForm.valid) {
      this.atractivosService.createAtractivo(this.atraccionForm.value).subscribe(() => {
        this.loadAtracciones();
        this.atraccionForm.reset();
      });
      Swal.fire({
        title: "!Hecho!",
        text: "Registro exitoso.",
        icon: "success"
      });
    }
  }

  editAtraccion(atraccion: any): void {
    this.isEditing = true;
    this.editingAtraccionId = atraccion.id_atracTuris;
    this.atraccionForm.setValue({
      nom_actur: atraccion.nom_actur,
      tipo_actur: atraccion.tipo_actur,
      accesbilidad_actur: atraccion.accesbilidad_actur,
      descripcion_actur: atraccion.descripcion_actur,
      nom_calle_actur: atraccion.nom_calle_actur,
      num_calle_actur: atraccion.num_calle_actur,
      localidad_actur: atraccion.localidad_actur,
      tipologia_actur: atraccion.tipologia_actur,
      num_visitantes_actur: atraccion.num_visitantes_actur,
      categoria_actur: atraccion.categoria_actur,
      servicios_actur: atraccion.servicios_actur,
      costo_actur: atraccion.costo_actur
    });
  }

  updateAtraccion(): void {
    if (this.atraccionForm.valid && this.editingAtraccionId !== null) {
      const updatedAtraccion = { ...this.atraccionForm.value, id_atracTuris: this.editingAtraccionId };
      this.atractivosService.updateAtractivo(updatedAtraccion).subscribe(() => {
        this.loadAtracciones();
        this.atraccionForm.reset();
        this.isEditing = false;
        this.editingAtraccionId = null;
      });
    }
  }

  deleteAtraccion(id_atracTuris: number): void {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No serás capaz de revertir está acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "!Borrado!",
          text: "Tu registro ha sido borrado.",
          icon: "success"
        });
        this.atractivosService.deleteAtractivo(id_atracTuris).subscribe(() => {
          this.loadAtracciones();
        });
      }
    });
  }
}

