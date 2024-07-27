import { Component } from '@angular/core';
import { url } from 'node:inspector';
import { last } from 'rxjs';

@Component({
  selector: 'app-layout-page-gestor',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.scss'
})
export class LayoutPageComponent {

  public sidebarItems=[
    {label:'Agencias',icon: 'source_environment', url: './agencias-CRUD'},
    {label: 'Administradores', icon: 'manage_accounts', url: './administradores-CRUD'},

    {label: 'Inicio', icon: 'door_front', url:'/inicio'}
  ]

}
