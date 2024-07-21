import { Component } from '@angular/core';
import { PackageDataService } from '../../../../core/services/admin-crear-paquete.service';


@Component({
  selector: 'app-acordeon-paquete',
  templateUrl: './acordeon-paquete.component.html',
  styleUrl: './acordeon-paquete.component.scss'
})
export class AcordeonPaqueteComponent {
  constructor(private packageDataService: PackageDataService) {}

  selectItem(item: any) {
    this.packageDataService.addItem(item);
  }

  deselectItem(item: any) {
    this.packageDataService.removeItem(item);
  }
}