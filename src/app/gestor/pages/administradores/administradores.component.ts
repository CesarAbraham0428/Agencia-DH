import { Component } from '@angular/core';


interface Administrador {
  id: number;
  nombre: string;
  apellidos: string;
  correo: string;
  role: string;
  agencia: string;
}

@Component({
  selector: 'app-administradores',
  templateUrl: './administradores.component.html',
  styleUrl: './administradores.component.scss'
})
export class AdministradoresComponent {

  nombre: string = '';
  apellidos: string = '';
  correo: string = '';
  role: string = '';
  agencia: string = '';
  data: Administrador[] = [];
  currentEditIndex: number | null = null;
  isEditing: boolean = false;
  nextId: number = 1;

  agregar(): void {
    if (this.validateForm()) {
      this.data.push({
        id: this.nextId++,
        nombre: this.nombre,
        apellidos: this.apellidos,
        correo: this.correo,
        role: this.role,
        agencia: this.agencia
      });
      this.clearForm();
    } else {
      // Aquí podrías agregar una notificación de error si la validación falla
      console.error('Todos los campos deben ser completados.');
    }
  }

  clearForm(): void {
    this.nombre = '';
    this.apellidos = '';
    this.correo = '';
    this.role = '';
    this.agencia = '';
    this.isEditing = false;
    this.currentEditIndex = null;
  }

  edit(index: number): void {
    const agencia = this.data[index];
    this.nombre = agencia.nombre;
    this.apellidos = agencia.apellidos;
    this.correo = agencia.correo;
    this.role = agencia.role;
    this.agencia = agencia.agencia;
    this.isEditing = true;
    this.currentEditIndex = index;
  }

  save(): void {
    if (this.currentEditIndex !== null && this.validateForm()) {
      this.data[this.currentEditIndex] = {
        ...this.data[this.currentEditIndex],
        nombre: this.nombre,
        apellidos: this.apellidos,
        correo: this.correo,
        role: this.role,
        agencia: this.agencia
      };
      this.clearForm();
    } else {
      // Aquí podrías agregar una notificación de error si la validación falla
      console.error('Todos los campos deben ser completados para guardar.');
    }
  }

  deleteRow(index: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta Hosteleria?')) {
      this.data.splice(index, 1);
    }
  }

  validateForm(): boolean {
    return [this.nombre, this.apellidos, this.correo, this.role, this.agencia]
      .every(field => field && field.trim().length > 0);
  }
}
