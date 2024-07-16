// src/app/shared/header/header.component.ts
import { Component, inject } from '@angular/core';
import { LoginService } from '../../../core/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  menuActive = false;
 loginService = inject(LoginService);

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  closeMenu() {
    this.menuActive = false;
  }
}
