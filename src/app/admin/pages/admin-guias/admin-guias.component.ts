import { Component } from '@angular/core';

interface Hosteleria {
  id: number;
  nombre: string;
  apellidos: string;
  calle: string;
  numeroCalle: string;
  comunidad: string;
  categoria: string;
  telefono: string;
  costo: string;
  email: string;
}

@Component({
  selector: 'app-admin-guias',
  templateUrl: './admin-guias.component.html',
  styleUrl: './admin-guias.component.scss'
})
export class AdminGuiasComponent {
  nombre: string = '';
  apellidos: string = '';
  calle: string = '';
  numeroCalle: string = '';
  comunidad: string = '';
  categoria: string = '';
  telefono: string = '';
  costo: string = '';
  email: string = '';
  data: Hosteleria[] = [];
  currentEditIndex: number | null = null;
  isEditing: boolean = false;
  nextId: number = 1;

  agregar(): void {
    if (this.validateForm()) {
      this.data.push({
        id: this.nextId++,
        nombre: this.nombre,
        apellidos: this.apellidos,
        calle: this.calle,
        numeroCalle: this.numeroCalle,
        comunidad: this.comunidad,
        categoria: this.categoria,
        telefono: this.telefono,
        costo: this.costo,
        email: this.email
      });
      this.clearForm();
    } else {
      console.error('Todos los campos deben ser completados.');
    }
  }

  clearForm(): void {
    this.nombre = '';
    this.apellidos = '';
    this.calle = '';
    this.numeroCalle = '';
    this.comunidad = '';
    this.categoria = '';
    this.telefono = '';
    this.costo = '';
    this.email = '';
    this.isEditing = false;
    this.currentEditIndex = null;
  }

  edit(index: number): void {
    const hosteleria = this.data[index];
    this.nombre = hosteleria.nombre;
    this.apellidos = hosteleria.apellidos;
    this.calle = hosteleria.calle;
    this.numeroCalle = hosteleria.numeroCalle;
    this.comunidad = hosteleria.comunidad;
    this.categoria = hosteleria.categoria;
    this.telefono = hosteleria.telefono;
    this.costo = hosteleria.costo;
    this.email = hosteleria.email;
    this.isEditing = true;
    this.currentEditIndex = index;
  }

  save(): void {
    if (this.currentEditIndex !== null && this.validateForm()) {
      this.data[this.currentEditIndex] = {
        ...this.data[this.currentEditIndex],
        nombre: this.nombre,
        apellidos: this.apellidos,
        calle: this.calle,
        numeroCalle: this.numeroCalle,
        comunidad: this.comunidad,
        categoria: this.categoria,
        telefono: this.telefono,
        costo: this.costo,
        email: this.email
      };
      this.clearForm();
    } else {
      console.error('Todos los campos deben ser completados para guardar.');
    }
  }

  deleteRow(index: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar a este Guía?')) {
      this.data.splice(index, 1);
    }
  }

  validateForm(): boolean {
    return [this.nombre, this.apellidos, this.calle, this.numeroCalle, this.comunidad, this.categoria, this.telefono, this.costo, this.email]
      .every(field => field && field.trim().length > 0);
  }
}
