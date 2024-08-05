import { Component, OnInit } from '@angular/core';
import { AtractivosService } from '../../../core/services/atractivos.service';

@Component({
  selector: 'app-parte5',
  templateUrl: './parte5.component.html',
  styleUrl: './parte5.component.scss'
})
export class Parte5Component implements OnInit{

  atractivos: any[] = [];

  constructor(
    private atrativosService: AtractivosService
  ){}

  ngOnInit(): void {
    this.loadAtractivos();
  }

  loadAtractivos(){
    this.atrativosService.getAllAtractivos().subscribe((data) => {
      this.atractivos = data;
    });
  }
}
