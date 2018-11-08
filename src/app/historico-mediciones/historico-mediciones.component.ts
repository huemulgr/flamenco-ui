import { Component, OnInit } from '@angular/core';
import { LecturaService } from 'src/app/services/lectura.service';

@Component({
  selector: 'app-historico-mediciones',
  templateUrl: './historico-mediciones.component.html',
  styleUrls: ['./historico-mediciones.component.css']
})
export class HistoricoMedicionesComponent implements OnInit {
  //TODO: para ahorrar en tiempo me tome muchas licencias con este CU. Hay que refactorizar gran parte del codigo
  //y agregar entre otras cosas el soporte para varias paginas
  
  //TODO: la data viene como un json con fecha hora y cada punto de sensado como columna, manteniendo orden. 
  //Todo el procesamiento se esta haciendo aca, deberia estar en el backend
  dataEnCrudo;
  columnas = [];
  filas = [];
  mostrar = false;

  //campos fecha con default hoy
  fechaInicio = this.fechaAString(new Date());
  fechaFin =  this.fechaAString(new Date());
  fechaActual;
  
  fechaAString(fecha: Date): string {
    return fecha.getFullYear() + '-' + 
              ('0' + (fecha.getMonth() + 1)).slice(-2) + '-' + 
              ('0' + fecha.getDate()).slice(-2);
  }
  stringAFecha(fechaString: string): Date {
    let x = fechaString.split('-');  
    let d = new Date(Number(x[0]), Number(x[1])-1, Number(x[2]));    
    return d;
  }
  sumarDias(fechaString: string, dias: number): string {    
    let d = this.stringAFecha(fechaString);
    d.setDate(d.getDate() + dias);
    return this.fechaAString(d);
  }

  constructor(private lecturaService: LecturaService) { }

  ngOnInit() { }

  obtenerHistorico() {
    this.fechaActual = '' + this.fechaInicio;
    this.getLecturasPivot(this.fechaActual);
  }
  
  diaSiguienteHistorico() {
    this.fechaActual = this.sumarDias(this.fechaActual, 1);
    this.getLecturasPivot(this.fechaActual);
  }
  diaAnteriorHistorico() {
    this.fechaActual = this.sumarDias(this.fechaActual, -1);
    this.getLecturasPivot(this.fechaActual);
  }
  
  getLecturasPivot(fecha: string) {
    this.lecturaService.getLecturasPivot(fecha).
      subscribe( 
          (data) => { 
              this.dataEnCrudo = data;
              
              this.columnas = [];
              this.filas = [];
              
              let flagColumnas = true;
              
              for(let registro of data) {
                let fila = [];
                for(let orden of registro) {
                  let fields = Object.keys(orden);
                  fila.push(orden[fields[0]]);                  
                }
                this.filas.push(fila);
                
                if(flagColumnas) {
                  for(let orden of registro) {
                    let columnas = Object.keys(orden);
                    this.columnas.push(columnas[0]);                  
                  }
                  flagColumnas = false;    
                }
              }
              
              this.mostrar = true;
              debugger;
          }
      );    
  }  

}
