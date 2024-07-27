import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../core/services/crearAdmin.service';

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
    private adminService: AdminService) {
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
      }
    }
  }

  editAdmin(admin: any): void {
    this.isEditing = true;
    this.selectedAdmin = admin;
    this.agenciaForm.patchValue(admin);
  }

  deleteAdmin(id_usr: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este administrador?')) {
      this.adminService.deleteAdmin(id_usr).subscribe(() => {
        this.loadAdmins();
      });
    }
  }
}
