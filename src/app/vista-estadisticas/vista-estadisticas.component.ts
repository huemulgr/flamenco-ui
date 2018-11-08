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
  puntoDeSensadoSeleccionado2: PuntoDeSensado; 
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
              this.segregarDatosLecturas(this.puntoDeSensadoSeleccionado);
              debugger;
          }
      );    
  }    
    
  //los datos de las lecturas se separan en ejes x(labels) e y(data)
  private segregarDatosLecturas(ps: PuntoDeSensado) {      
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
      this.lineChartData.push({data: dataY, label: ps.nombreCorto});    
      this.chart.chart.config.data.labels = this.lineChartLabels;
      this.mostrarCurva = "visible"; 
  }  
    
  generarCurva() {  
    this.getLecturas(this.puntoDeSensadoSeleccionado.id, this.fechaInicio, this.fechaFin); 
    this.getLecturas(this.puntoDeSensadoSeleccionado.id, this.fechaInicio, this.fechaFin); 
  }  
  
  //TODO: arreglar multiples curvas a la vez  
  getLecturas2(idPuntoDeSensado:number, fechaDesde:string, fechaHasta:string) {
    this.lecturaService.getLecturas(idPuntoDeSensado, fechaDesde, fechaHasta).
      subscribe( 
        (data) => { 
            var aux2 = new Array();
            debugger;
//            for(let x of this.lineChartData){
//                aux2.push(x);
//            }            

//            this.lineChartData = new Array<any>();      
            this.lineChartLabels = new Array<any>();
            
            var dataY = new Array();
            var lecturas2: Lectura[] = data;
            //tomar el dato de cada registro      
            for(let lectura of lecturas2) {
                dataY.push(lectura.valor);
                this.lineChartLabels.push([lectura.hora, lectura.fecha]);
            }
            
            aux2.push({data: dataY, label:this.puntoDeSensadoSeleccionado2.nombreCorto}); 
            for(let x of aux2) {
                this.lineChartData.push(x);   
            }
            this.chart.chart.config.data.labels = this.lineChartLabels;
            debugger;
        }
    );    
  }    
  agregarPunto() {
    this.getLecturas2(this.puntoDeSensadoSeleccionado2.id, this.fechaInicio, this.fechaFin);   
  }  
    
    
  // lineChart
  public lineChartData: Array<any> = [
    {data: [], label: 'Vacio'},{data: [], label: 'Vacio'}      
  ];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    /*  para ocultar eje y, en otro momento puede servir como mejora para que el eje acompa�e el scroll
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
      backgroundColor: 'rgba(255,50,0,0.0)',
      borderColor: 'rgba(255,50,0,1)',
      pointBackgroundColor: 'rgba(180,80,0,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // grey
      backgroundColor: 'rgba(80,80,80,0.0)',
      borderColor: 'rgba(80,80,80,1)',
      pointBackgroundColor: 'rgba(80,80,80,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(128,159,177,0.8)'
    },
    { // grey
      backgroundColor: 'rgba(60,60,60,0.2)',
      borderColor: 'rgba(80,80,80,1)',
      pointBackgroundColor: 'rgba(100,100,100,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
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


