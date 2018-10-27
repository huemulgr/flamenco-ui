import { Component, OnInit } from '@angular/core';
import { EstadoActualService } from "src/app/services/estado-actual.service";
import { PlantaService } from "src/app/services/planta.service";
import { PuntoDeSensadoService } from "src/app/services/punto-de-sensado.service";
import { startWith, switchMap } from "rxjs/operators";
import { interval } from "rxjs/internal/observable/interval";
import { EstadoMas } from "src/app/model/estado-mas.model";
import { Planta } from "src/app/model/planta.model";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vista-plano',
  templateUrl: './vista-plano.component.html',
  styleUrls: ['./vista-plano.component.css']
})
export class VistaPlanoComponent implements OnInit {

  //estado actual, cada elemento corresponde a un MAS
  estadoActual: EstadoMas[];
  interval: Subscription;
  plantas: Planta[] = new Array<Planta>();  
  plantaSeleccionada: Planta = new Planta();  
    
  constructor(private service: EstadoActualService, private plantaService: PlantaService,
        private puntoSensadoService: PuntoDeSensadoService ) { }

  ngOnInit() {
    this.getPlantas();  
    this.observarEstadoActual();
  }
    
  observarEstadoActual() {
    //esto hace polling cada 5 segundos recuperando el estado actual del servidor
    //TODO: hacer configurable o con constante al menos    
    this.interval = interval(2000)
      .pipe(
        startWith(0),
        switchMap(() => this.service.getEstadoActual())
      ).subscribe(data => {
          this.estadoActual = data;
          this.puntoSensadoService.getAlarmasOn();
      })
    ;
  } 
  getPlantas() {
    this.plantaService.getAll()
      .subscribe(
          (data) => { 
              this.plantas = data;
              if(this.plantas.length > 0) {
                this.plantaSeleccionada = this.plantas[0];
              }
          }
      );
  }  

  onClickPlanta(planta: Planta) {
    this.plantaSeleccionada = planta;
  }  
    
  ngOnDestroy() {
    this.interval.unsubscribe();
  }
}