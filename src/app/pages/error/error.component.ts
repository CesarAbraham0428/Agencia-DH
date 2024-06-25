import { Component } from '@angular/core';

@Component({
  selector: 'app-error',
  template: `
    <h1>
      Error 404 Página no encontrada.
    </h1>
  `,
  styles: `
    h1{
      margin: 3em 0;

      color:red;

      font-size:3rem;
      text-align:center;
    }

  `
})
export class ErrorComponent {

}
