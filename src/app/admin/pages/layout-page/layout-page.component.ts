import { Component } from '@angular/core';
import { url } from 'node:inspector';
import { last } from 'rxjs';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.scss'
})
export class LayoutPageComponent {

  public sidebarItems=[
    {label:'Usuarios',icon: 'manage_accounts', url: './admin-usuario'},
    {label: 'Crear Paquetes', icon: 'source_environment', url: './crear-paquetes'},
    {label: 'Paquetes', icon: 'door_front', url:'./adminPaquetes'},
    {label: 'Transportistas', icon: 'airport_shuttle', url:'./admin-transportista'},
    {label: 'Hosteleria', icon: 'home_work', url: './admin-hosteleria'},
    {label: 'Guias', icon: 'contacts', url:'./admin-guias'},
    {label: 'Atractivos', icon: 'temple_buddhist', url:'./admin-atractivos'},
    {label: 'Inicio', icon: 'door_front', url:'/inicio'}

  ]

}
