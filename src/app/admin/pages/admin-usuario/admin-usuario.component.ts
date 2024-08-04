import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../core/services/usuarios.service';

@Component({
  selector: 'app-admin-usuario',
  templateUrl: './admin-usuario.component.html',
  styleUrl: './admin-usuario.component.scss'
})
export class AdminUsuarioComponent implements OnInit {
  usuarios: any[] = [];

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.usuariosService.getTodosUsuarios().subscribe((data) => {
      this.usuarios = data;
    })
  }
}
