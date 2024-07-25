import { Component } from '@angular/core';

interface Atractivos {
  id: number;
  atractivo: string;
  accesibilidad: string;
  descripcion: string;
  calle: string;
  numeroCalle: string;
  localidad: string;
  tipologia: string;
  numeroVisitantes: string;
  categoria: string;
  servicios: string;
  costo: string;
  idCiudad: number;
}

@Component({
  selector: 'app-admin-atractivos-turist',
  templateUrl: './admin-atractivos-turist.component.html',
  styleUrl: './admin-atractivos-turist.component.scss'
})
export class AdminAtractivosTuristComponent {

  atractivo: string = '';
  accesibilidad: string = '';
  descripcion: string = '';
  calle: string = '';
  numeroCalle: string = '';
  localidad: string = '';
  tipologia: string = '';
  numeroVisitantes: string = '';
  categoria: string = '';
  servicios: string = '';
  costo: string = '';
  data: Atractivos[] = [];
  currentEditIndex: number | null = null;
  isEditing: boolean = false;
  nextId: number = 1;
  idCiudad: number = 1;

  agregar(): void {
    if (this.validateForm()) {
      this.data.push({
        id: this.nextId++,
        atractivo: this.atractivo,
        accesibilidad: this.accesibilidad,
        descripcion: this.descripcion,
        calle: this.calle,
        numeroCalle: this.numeroCalle,
        localidad: this.localidad,
        tipologia: this.tipologia,
        numeroVisitantes: this.numeroVisitantes,
        categoria: this.categoria,
        servicios: this.servicios,
        costo: this.costo,
        idCiudad: this.idCiudad
      });
      this.clearForm();
    } else {
      console.error('Todos los campos deben ser completados.');
    }
  }

  clearForm(): void {
    this.atractivo = '';
    this.accesibilidad = '';
    this.descripcion = '';
    this.calle = '';
    this.numeroCalle = '';
    this.localidad = '';
    this.tipologia = '';
    this.numeroVisitantes = '';
    this.categoria = '';
    this.servicios = '';
    this.costo = '';
    this.isEditing = false;
    this.currentEditIndex = null;
  }

  edit(index: number): void {
    const hosteleria = this.data[index];
    this.atractivo = hosteleria.atractivo;
    this.accesibilidad = hosteleria.accesibilidad;
    this.descripcion = hosteleria.descripcion;
    this.calle = hosteleria.calle;
    this.numeroCalle = hosteleria.numeroCalle;
    this.localidad = hosteleria.localidad;
    this.tipologia = hosteleria.tipologia;
    this.numeroVisitantes = hosteleria.numeroVisitantes;
    this.categoria = hosteleria.categoria;
    this.servicios = hosteleria.servicios;
    this.costo = hosteleria.costo;
    this.isEditing = true;
    this.currentEditIndex = index;
  }

  save(): void {
    if (this.currentEditIndex !== null && this.validateForm()) {
      this.data[this.currentEditIndex] = {
        ...this.data[this.currentEditIndex],
        atractivo: this.atractivo,
        accesibilidad: this.accesibilidad,
        descripcion: this.descripcion,
        calle: this.calle,
        numeroCalle: this.numeroCalle,
        localidad: this.localidad,
        tipologia: this.tipologia,
        numeroVisitantes: this.numeroVisitantes,
        categoria: this.categoria,
        servicios: this.servicios,
        costo: this.costo
      };
      this.clearForm();
    } else {
      console.error('Todos los campos deben ser completados para guardar.');
    }
  }

  deleteRow(index: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este Atractivo Turistico?')) {
      this.data.splice(index, 1);
    }
  }

  validateForm(): boolean {
    return [this.atractivo, this.accesibilidad, this.descripcion, this.calle, this.numeroCalle, this.localidad, this.tipologia, this.numeroVisitantes, this.categoria, this.servicios, this.costo]
      .every(field => field && field.trim().length > 0);
  }
}

