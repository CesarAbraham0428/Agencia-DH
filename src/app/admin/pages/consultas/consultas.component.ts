import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConsultaService } from '../../../core/services/consulta.service';


@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrl: './consultas.component.scss',
  providers: [DatePipe]
})
export class ConsultasComponent implements OnInit{
  consultas: any[] = [];

  constructor(
    private consultaService: ConsultaService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getConsultas();
  }

  getConsultas():  void {
    this.consultaService.recibirConsulta().subscribe((data) => {
      this.consultas = data;
    })
  }

  formatDate(date: string): string {
    return this.datePipe.transform(date, 'dd-MM-yyyy')!;
  }
}
