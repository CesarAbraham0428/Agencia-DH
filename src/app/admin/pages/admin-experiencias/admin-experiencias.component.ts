import { Component } from '@angular/core';

interface Experience {
  producto: string;
  description: string;
}

@Component({
  selector: 'app-admin-experiencias',
  templateUrl: './admin-experiencias.component.html',
  styleUrls: ['./admin-experiencias.component.scss']
})
export class AdminExperienciasComponent {
  producto: string = '';
  description: string = '';
  data: Experience[] = [];
  currentEditIndex: number | null = null;
  isEditing: boolean = false;

  agregar(): void {
    if (this.producto && this.description) {
      this.data.push({ producto: this.producto, description: this.description });
      this.clearForm();
    }
  }

  clearForm(): void {
    this.producto = '';
    this.description = '';
    this.isEditing = false;
    this.currentEditIndex = null;
  }

  edit(index: number): void {
    this.producto = this.data[index].producto;
    this.description = this.data[index].description;
    this.isEditing = true;
    this.currentEditIndex = index;
  }

  save(): void {
    if (this.currentEditIndex !== null) {
      this.data[this.currentEditIndex].producto = this.producto;
      this.data[this.currentEditIndex].description = this.description;
      this.clearForm();
    }
  }

  deleteRow(index: number): void {
    this.data.splice(index, 1);
  }
}
