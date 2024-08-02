import { Component } from '@angular/core';

@Component({
  selector: 'app-error',
  template: `
    <p>
      Error 404 Página no encontrada.
    </p>
  `,
  styles: `
    p{
      margin: 3em 0;

      color:red;

      font-size:3rem;
      text-align:center;
      
    }

  `
})
export class ErrorComponent {

}
