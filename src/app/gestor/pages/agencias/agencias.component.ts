import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgenciaService } from '../../../core/services/agencia.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/directives/dialog-content/confirm-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agencias',
  templateUrl: './agencias.component.html',
  styleUrls: ['./agencias.component.scss']
})
export class AgenciasComponent implements OnInit{
  agenciaForm: FormGroup;
  agencias: any[] = [];
  isEditing = false;
  editingAgenciaId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private agenciaService: AgenciaService,
    public dialog: MatDialog) {
    this.agenciaForm = this.fb.group({
      nom_ag: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAgencias();
  }

  loadAgencias(): void {
    this.agenciaService.getAllAgencias().subscribe((data) => {
      this.agencias = data;
    });
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.updateAgencia();
    } else {
      this.createAgencia();
    }
  }

  createAgencia(): void {
    if (this.agenciaForm.valid) {
      this.agenciaService.createAgencia(this.agenciaForm.value).subscribe(() => {
        this.loadAgencias();
        this.agenciaForm.reset();
      });
      Swal.fire({
        title: "!Hecho!",
        text: "Registro exitoso.",
        icon: "success"
      });
    }
  }

  editAgencia(agencia: any): void {
    this.isEditing = true;
    this.editingAgenciaId = agencia.id_agencia;
    this.agenciaForm.setValue({
      nom_ag: agencia.nom_ag
    });
  }

  updateAgencia(): void {
    if (this.agenciaForm.valid && this.editingAgenciaId !== null) {
      const updatedAgencia = { ...this.agenciaForm.value, id_agencia: this.editingAgenciaId };
      this.agenciaService.updateAgencia(updatedAgencia).subscribe(() => {
        this.loadAgencias();
        this.agenciaForm.reset();
        this.isEditing = false;
        this.editingAgenciaId = null;
      });
    }
  }

  deleteAgencia(id_agencia: number): void {
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
        this.agenciaService.deleteAgencia(id_agencia).subscribe(() => {
          this.loadAgencias();
        });
      }
    });
  }

}
