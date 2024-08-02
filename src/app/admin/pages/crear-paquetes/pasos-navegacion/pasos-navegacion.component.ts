import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pasos-navegacion',
  templateUrl: './pasos-navegacion.component.html',
  styleUrl: './pasos-navegacion.component.scss'
})
export class PasosNavegacionComponent {
  @Input()
  currentStep!: number;

  steps = [
    { number: 1, description: 'Paso 1: Servicios' },
    { number: 2, description: 'Paso 2: Creación de Itinerario' }
  ];

  get currentStepDescription(): string {
    const step = this.steps.find(s => s.number === this.currentStep);
    return step ? step.description : '';
  }
}