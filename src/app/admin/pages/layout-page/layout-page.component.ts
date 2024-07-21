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
    {label:'Usuarios',icon: 'manage_accounts', url: ''},
    {label: 'Transportistas', icon: 'airport_shuttle', url:''},
    {label: 'Hoteles', icon: 'home_work', url: ''},
    {label: 'Paquetes', icon: 'source_environment', url: ''},
    {label: 'Paquetes Pers', icon: 'edit_square', url: './admin-personalizados'},
    {label: 'Guias', icon: 'contacts', url:''},
    {label: 'Atractivos', icon: 'temple_buddhist', url:''},
    {label: 'Ciudad', icon: 'location_on', url:''},
    {label: 'Inicio', icon: 'door_front', url:'/inicio'}

  ]

}
