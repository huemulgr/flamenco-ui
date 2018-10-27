import { Component, Input, OnInit } from '@angular/core';
import {EstadoMas} from "src/app/model/estado-mas.model";

@Component({
  selector: 'app-mas',
  templateUrl: './mas.component.html',
  styleUrls: ['./mas.component.css']
})
export class MasComponent implements OnInit {
    
  @Input() estado: EstadoMas;
  @Input() idPlantaSeleccionada: number;  
  @Input() enAlarma: boolean;  
    
  constructor() { }

  ngOnInit() {
  }

  //se oculta o muestra segun la planta que se esta visualizando
  visibilidad(): string {
      if(this.estado.idPlanta == this.idPlantaSeleccionada) {
          return "visible";
      } else {
          return "hidden";
      };
  }
  
}
