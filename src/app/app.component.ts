import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'agencia-dh';

  // Código de para ocultar y visualizar el menu

  menuActive: boolean = false;

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }


}
