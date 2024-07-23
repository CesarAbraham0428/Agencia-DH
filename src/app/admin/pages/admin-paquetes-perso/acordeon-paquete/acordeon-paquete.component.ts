import { Component, OnInit } from '@angular/core';
import { PackageDataService } from '../../../../core/services/admin-crear-paquete.service';
import { HotelService } from '../../../../core/services/CRUDS/crud-hoteles.service';


@Component({
  selector: 'app-acordeon-paquete',
  templateUrl: './acordeon-paquete.component.html',
  styleUrl: './acordeon-paquete.component.scss'
})
export class AcordeonPaqueteComponent implements OnInit{

  hoteles: any[] = [];

  constructor(
    private packageDataService: PackageDataService,
    private hotelService: HotelService
  ) {}


  ngOnInit() {
    this.hotelService.getHoteles().subscribe(
      data => {
        this.hoteles = data;
      },
      error => {
        console.error('Error al obtener hoteles:', error);
      }
    );
  }
  
  selectItem(hotel: any) {
    this.packageDataService.addItem('servicio', hotel);
  }
  
  
  deselectItem(hotel: any) {
    this.packageDataService.removeItem('servicio', hotel);
  }
  

}
