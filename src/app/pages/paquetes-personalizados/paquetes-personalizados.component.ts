import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HosteleriaService } from '../../core/services/hosteleria.service';

@Component({
  selector: 'app-paquetes-personalizados',
  templateUrl: './paquetes-personalizados.component.html',
  styleUrls: ['./paquetes-personalizados.component.scss']
})
export class PaquetesPersonalizadosComponent implements OnInit {
  hoteles: any[] = [];

  constructor(
    private hotelesService: HosteleriaService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.loadHoteles();
  }

  loadHoteles(): void {
    this.hotelesService.getAllHostelerias().subscribe(
      (data) => {
        this.hoteles = data.filter((h: { tipo_hs: string; }) => h.tipo_hs === 'Hotel');
      },
      (error) => {
        console.error('Error al cargar hostelería:', error);
      }
    );
  }
}
