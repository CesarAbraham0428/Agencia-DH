import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../core/services/crearAdmin.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/directives/dialog-content/confirm-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administradores',
  templateUrl: './administradores.component.html',
  styleUrl: './administradores.component.scss'
})
export class AdministradoresComponent implements OnInit{
  admins: any[] = [];
  agencias: any[] = []; // Asegúrate de definir esto
  agenciaForm: FormGroup;
  isEditing = false;
  selectedAdmin: any;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    public dialog: MatDialog) {
    this.agenciaForm = this.fb.group({
      id_usr: [null],
      nom_usr: ['', Validators.required],
      app_usr: ['', Validators.required],
      email_usr: ['', [Validators.required, Validators.email]],
      passwd_usr: ['', Validators.required],
      nom_ag: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAdmins();
    this.loadAgencias(); // Cargar agencias para el select
  }

  loadAdmins(): void {
    this.adminService.getAllAdmins().subscribe(data => {
      this.admins = data;
    });
  }

  loadAgencias(): void {
    // Asumiendo que tienes un servicio que obtiene las agencias
    this.adminService.getAllAgencias().subscribe(data => {
      this.agencias = data;
    });
  }

  onSubmit(): void {
    if (this.agenciaForm.valid) {
      if (this.isEditing) {
        this.adminService.updateAdmin(this.agenciaForm.value).subscribe(() => {
          this.loadAdmins();
          this.agenciaForm.reset();
          this.isEditing = false;
        });
      } else {
        this.adminService.createAdmin(this.agenciaForm.value).subscribe(() => {
          this.loadAdmins();
          this.agenciaForm.reset();
        });
        Swal.fire({
          title: "!Hecho!",
          text: "Registro exitoso.",
          icon: "success"
        });
      }
    }
  }

  editAdmin(admin: any): void {
    this.isEditing = true;
    this.selectedAdmin = admin;
    this.agenciaForm.patchValue(admin);
  }

  deleteAdmin(id_usr: number): void {
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
        this.adminService.deleteAdmin(id_usr).subscribe(() => {
          this.loadAdmins();
        });
      }
    });
  }

  hasErrors(controlName: string, errorName: string): boolean {
    const control = this.agenciaForm.get(controlName);
    return control ? control.hasError(errorName) && control.touched : false;
  }
}
