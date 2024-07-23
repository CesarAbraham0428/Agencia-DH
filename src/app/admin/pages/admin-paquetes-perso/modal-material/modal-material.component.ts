import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-material',
  templateUrl: './modal-material.component.html',
  styleUrls: ['./modal-material.component.scss']
})
export class ModalMaterialComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalMaterialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      costo: [0, [Validators.required, Validators.min(0)]],
      tipo: ['', Validators.required]
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
