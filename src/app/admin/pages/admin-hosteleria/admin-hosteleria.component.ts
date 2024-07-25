import { Component } from '@angular/core';

interface Hosteleria {
  id: number;
  nombre: string;
  descripcion: string;
  accesibilidad: string;
  tipologia: string;
  costo: string;
  capacidad: string;
  servicio: string;
  id_ciudad: number;
}

@Component({
  selector: 'app-admin-hosteleria',
  templateUrl: './admin-hosteleria.component.html',
  styleUrl: './admin-hosteleria.component.scss'
})
export class AdminHosteleriaComponent {

  nombre: string = '';
  descripcion: string = '';
  accesibilidad: string = '';
  tipologia: string = '';
  costo: string = '';
  capacidad: string = '';
  servicio: string = '';
  data: Hosteleria[] = [];
  currentEditIndex: number | null = null;
  isEditing: boolean = false;
  nextId: number = 1;
  id_ciudad: number = 1;

  agregar(): void {
    if (this.validateForm()) {
      this.data.push({
        id: this.nextId++,
        nombre: this.nombre,
        descripcion: this.descripcion,
        accesibilidad: this.accesibilidad,
        tipologia: this.tipologia,
        costo: this.costo,
        capacidad: this.capacidad,
        servicio: this.servicio,
        id_ciudad: this.id_ciudad
      });
      this.clearForm();
    } else {
      // Aquí podrías agregar una notificación de error si la validación falla
      console.error('Todos los campos deben ser completados.');
    }
  }

  clearForm(): void {
    this.nombre = '';
    this.descripcion = '';
    this.accesibilidad = '';
    this.tipologia = '';
    this.costo = '';
    this.capacidad = '';
    this.servicio = '';
    this.isEditing = false;
    this.currentEditIndex = null;
  }

  edit(index: number): void {
    const hosteleria = this.data[index];
    this.nombre = hosteleria.nombre;
    this.descripcion = hosteleria.descripcion;
    this.accesibilidad = hosteleria.accesibilidad;
    this.tipologia = hosteleria.tipologia;
    this.costo = hosteleria.costo;
    this.capacidad = hosteleria.capacidad;
    this.servicio = hosteleria.servicio;
    this.isEditing = true;
    this.currentEditIndex = index;
  }

  save(): void {
    if (this.currentEditIndex !== null && this.validateForm()) {
      this.data[this.currentEditIndex] = {
        ...this.data[this.currentEditIndex],
        nombre: this.nombre,
        descripcion: this.descripcion,
        accesibilidad: this.accesibilidad,
        tipologia: this.tipologia,
        costo: this.costo,
        capacidad: this.capacidad,
        servicio: this.servicio
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
    return [this.nombre, this.descripcion, this.accesibilidad, this.tipologia, this.costo, this.capacidad, this.servicio]
      .every(field => field && field.trim().length > 0);
  }
}


