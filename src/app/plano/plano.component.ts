import { Component, Input, OnInit } from '@angular/core';
import { startWith, switchMap } from "rxjs/operators";
import { interval } from "rxjs/internal/observable/interval";
import { EstadoMas } from "src/app/model/estado-mas.model";
import { Planta } from "src/app/model/planta.model";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-plano',
  templateUrl: './plano.component.html',
  styleUrls: ['./plano.component.css']
})
export class PlanoComponent implements OnInit {

  @Input() planta: Planta;
  @Input() estadoActual: EstadoMas[];  
    
  //coordenadas de un click dentro del plano  
  clientX: number;
  clientY: number;
  offsetX: number;
  offsetY: number; 

  //variables para carga de imagen de plano  
  srcImg: string = "";
  fileReader = new FileReader();
    
  //esta asociado a class del contenedor del plano, puede cambiar entre normal y edicion o alguno mas si surge  
  estiloPlano: string = "normal";
    
  constructor() { }

  ngOnInit() {
  }

  //click sobre plano  
  prueba1(event) {
    this.clientX = event.clientX;
    this.clientY = event.clientY;
    this.offsetX = event.offsetX;
    this.offsetY = event.offsetY;
    console.log(event);
  }

}
