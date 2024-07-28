import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ReasignarService } from '../../core/services/reasignar.service';
import { DialogContentExampleDialog } from '../../shared/directives/dialog-content/dialog-content.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-recuperarP',
  templateUrl: './recuperarP.component.html',
  styleUrl: './recuperarP.component.scss'
})
export class RecuperarPComponent{

  correoRecForm!: FormGroup;

  constructor (
    public dialog: MatDialog,
    private fb: FormBuilder,
    private reasignarService: ReasignarService
  ){
    this.correoRecForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.correoRecForm.valid) {
      this.reasignarService.requestPasswordReset(this.correoRecForm.value.email).subscribe(
        response => {
        Swal.fire({
          title: "!Hecho!",
          text: "Email de restablecimiento enviado.",
          icon: "success"
        });
      },
      error => {
        let message = 'Error al enviar el email de restablecimiento';
        if (error.status === 429) {
          message = 'Por favor, espere una hora antes de solicitar nuevamente.';
        }
        Swal.fire({
          title: "Error!",
          text: message,
          icon: "error"
        });}
      );
    }
  }

  hasErrors(controlName: string, errorName: string): boolean {
    const control = this.correoRecForm.get(controlName);
    return control ? control.hasError(errorName) && control.touched : false;
  }
}
