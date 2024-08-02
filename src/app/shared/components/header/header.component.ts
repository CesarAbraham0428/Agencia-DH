// src/app/shared/header/header.component.ts
import { Component, inject } from '@angular/core';
import { LoginService } from '../../../core/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  menuActive = false;
  router = inject(Router);
  loginService = inject(LoginService);

 // Código para ocultar y visualizar el menu de navegación
  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  closeMenu() {
    this.menuActive = false;
  }

  onClickLogOut(){
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
    }

    this.router.navigate(['/inicio']);
  }
}
