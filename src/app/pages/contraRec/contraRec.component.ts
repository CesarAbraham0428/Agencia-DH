import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DialogContentExampleDialog } from '../../shared/directives/dialog-content/dialog-content.component';
import { MatDialog } from '@angular/material/dialog';
import { ReasignarService } from '../../core/services/reasignar.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './contraRec.component.html',
  styleUrl: './contraRec.component.scss'
})
export class ContraRecComponent implements OnInit{

  contraRecForm!: FormGroup;
  token: string = '';

  constructor (
    public dialog: MatDialog,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private reasignarService: ReasignarService,
    private router: Router,
  ){
    this.contraRecForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'];
  }

  onSubmit() {
    if (this.contraRecForm.valid) {
      this.reasignarService.resetPassword(this.token, this.contraRecForm.value.newPassword).subscribe(
        response => {
          Swal.fire({
            title: "!Hecho!",
            text: "Contraseña actualizada.",
            icon: "success"
          });
          this.router.navigate(['/login']);
        },
        error => {
          Swal.fire({
            title: "Error!",
            text: "Error al actualizar la contraseña.",
            icon: "error"
          });
        }
      );
    }
  }

  hasErrors(controlName: string, errorName: string): boolean {
    const control = this.contraRecForm.get(controlName);
    return control ? control.hasError(errorName) && control.touched : false;
  }
}
