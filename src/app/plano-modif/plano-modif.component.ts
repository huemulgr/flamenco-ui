import { Component, Input, OnInit } from '@angular/core';
import { PuntoDeSensado } from "src/app/model/punto-de-sensado.model";
import { Planta } from "src/app/model/planta.model";

@Component({
  selector: 'app-plano-modif',
  templateUrl: './plano-modif.component.html',
  styleUrls: ['./plano-modif.component.css']
})
export class PlanoModifComponent implements OnInit {

  offsetX: number;
  offsetY: number; 
  @Input() puntoSensado: PuntoDeSensado;
  @Input() planta: Planta; 
    
  //esta asociado a class del contenedor del plano, puede cambiar entre normal y edicion o alguno mas si surge  
  estiloPlano: string = "normal";
  
    
  constructor() { }

  ngOnInit() {
    this.offsetX = this.puntoSensado.coordX;
    this.offsetY = this.puntoSensado.coordY;
  }

  //click sobre plano  
  onClick(event) {
    this.offsetX = event.offsetX;
    this.offsetY = event.offsetY;
    this.puntoSensado.coordX = this.offsetX;
    this.puntoSensado.coordY = this.offsetY;
  }
    

}
