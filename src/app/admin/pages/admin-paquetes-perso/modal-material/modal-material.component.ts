import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface DialogData {
  nombre: string;
  costo: number;
  tipo: string;
}

@Component({
  selector: 'app-modal-material',
  templateUrl: './modal-material.component.html',
  styleUrls: ['./modal-material.component.scss']
})
export class ModalMaterialComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalMaterialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nombre: [data.nombre, Validators.required],
      costo: [data.costo, [Validators.required, Validators.min(0)]],
      tipo: [data.tipo, Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onCreate(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
