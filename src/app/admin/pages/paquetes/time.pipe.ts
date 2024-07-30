import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customTime'
})

export class CustomTimePipe implements PipeTransform {
    transform(value: string): string {
      if (!value) return '';
      
      // Asumiendo que el valor viene en formato HH:mm:ss
      const [hours, minutes] = value.split(':');
      return `${hours}:${minutes}`;
    }
  }
  