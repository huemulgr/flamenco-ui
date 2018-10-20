import { Component, OnInit, ViewChild } from '@angular/core';
import { LecturaService } from 'src/app/services/lectura.service';
import { PuntoDeSensadoService } from 'src/app/services/punto-de-sensado.service';
import { Lectura } from 'src/app/model/lectura.model';
import { PuntoDeSensado } from 'src/app/model/punto-de-sensado.model';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';


@Component({
  selector: 'app-vista-estadisticas',
  templateUrl: './vista-estadisticas.component.html',
  styleUrls: ['./vista-estadisticas.component.css']
})
export class VistaEstadisticasComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
    
  puntosDeSensado: PuntoDeSensado[];  
  puntoDeSensadoSeleccionado: PuntoDeSensado = new PuntoDeSensado(); 
  lecturas: Lectura[];  
  fechaInicio: string;
  fechaFin: string;    
  widthCurva: number = 1000;  
  mostrarCurva: string = "hidden";
    
  constructor(private lecturaService: LecturaService, private puntoDeSensadoService: PuntoDeSensadoService) { }

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
    
  getLecturas(idPuntoDeSensado:number, fechaDesde:string, fechaHasta:string) {
    this.lecturaService.getLecturas(idPuntoDeSensado, fechaDesde, fechaHasta).
      subscribe( 
          (data) => { 
              this.lecturas = data;
              this.segregarDatosLecturas();
              debugger;
          }
      );    
  }    
    
  //los datos de las lecturas se separan en ejes x(labels) e y(data)
  private segregarDatosLecturas() {      
      //vaciar datos anteriores
      var dataY = new Array();
      this.lineChartLabels = new Array<any>();
      this.lineChartData = new Array<any>();
      
      //tomar el dato de cada registro      
      for(let lectura of this.lecturas) {
        dataY.push(lectura.valor);
        this.lineChartLabels.push([lectura.hora, lectura.fecha]);
      }
      
      //refrescar grafico
      this.widthCurva = dataY.length * 75;
      this.lineChartData.push({data: dataY, label:this.puntoDeSensadoSeleccionado.nombreCorto});    
      this.chart.chart.config.data.labels = this.lineChartLabels;
      this.mostrarCurva = "visible"; 
  }  
    
  generarCurva() {  
    this.getLecturas(this.puntoDeSensadoSeleccionado.id, this.fechaInicio, this.fechaFin); 
  }  
    
  // lineChart
  public lineChartData: Array<any> = [{}];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    /*  para ocultar eje y, en otro momento puede servir como mejora para que el eje acompañe el scroll
    scales: {
        yAxes: [{
            ticks: {
                display: false
            }
        }]
    } */
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


