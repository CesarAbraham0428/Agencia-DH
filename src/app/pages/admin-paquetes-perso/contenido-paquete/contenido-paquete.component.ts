import { Component, OnInit } from '@angular/core';
import { PackageDataService } from "../../../services/admin-crear-paquete.service";

@Component({
  selector: 'app-contenido-paquete',
  templateUrl: './contenido-paquete.component.html',
  styleUrl: './contenido-paquete.component.scss'
})
export class ContenidoPaqueteComponent implements OnInit {
    selectedItems: any[] = [];
  
    constructor(private packageDataService: PackageDataService) {}
  
    ngOnInit() {
      this.packageDataService.selectedItems$.subscribe(items => {
        this.selectedItems = items;
      });
    }
  
    clearItems() {
      this.packageDataService.clearItems();
    }
}
