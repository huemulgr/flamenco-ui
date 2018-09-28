import { Component, OnInit } from '@angular/core';
import { PuntoDeSensadoService } from 'src/app/services/punto-de-sensado.service';
import { PuntoDeSensado } from 'src/app/model/punto-de-sensado.model';

export class AB{
    public a: any;
    public b: any;  
    
    constructor(a,b) {this.a=a; this.b=b}
}

@Component({
  selector: 'app-vista-estadisticas',
  templateUrl: './vista-estadisticas.component.html',
  styleUrls: ['./vista-estadisticas.component.css']
})
export class VistaEstadisticasComponent implements OnInit {

  private puntosDeSensado: PuntoDeSensado[];  
  private puntoDeSensadoSeleccionado: PuntoDeSensado = new PuntoDeSensado();  
  private ab: AB[] = [new AB(1,2), new AB(3,4)];  
    
  constructor(private puntoDeSensadoService: PuntoDeSensadoService) { }

  ngOnInit() {
      this.getPuntosDeSensado();
  }
    
  
  getPuntosDeSensado() {
    this.puntoDeSensadoService.getAll().
      subscribe( 
          (data) => { 
              this.puntosDeSensado = data;
          }
      );    
  }    
    
  // lineChart
  public lineChartData: Array<any> = [
    { data: [0, -5, -7, -4, 0, 4, 5, 6, 1, -3], label: 'temperatura' },
  ];
  public lineChartLabels: Array<any> = [
    '14:00', '14:10', '14:20', '14:30', '14:40', '14:50', '15:00', '15:10', '15:20', '15:30' 
  ];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(230,80,0,0.2)',
      borderColor: 'rgba(230,80,0,1)',
      pointBackgroundColor: 'rgba(180,80,0,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}


