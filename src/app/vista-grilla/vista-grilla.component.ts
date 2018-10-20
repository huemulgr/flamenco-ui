import { Component, OnInit } from '@angular/core';
import { EstadoActualService } from "src/app/services/estado-actual.service";
import { PuntoDeSensadoService } from "src/app/services/punto-de-sensado.service";
import { ActivacionManualService } from "src/app/services/activacion-manual.service";
import { ComportamientoUmbralService } from "src/app/services/comportamiento-umbral.service";
import { ComportamientoHoraService } from "src/app/services/comportamiento-hora.service";
import { EstadoMas } from "src/app/model/estado-mas.model";
import { PuntoDeSensado } from "src/app/model/punto-de-sensado.model";
import { ComportamientoUmbral } from "src/app/model/comportamiento-umbral.model";
import { ComportamientoHora } from "src/app/model/comportamiento-hora.model";
import { interval } from "rxjs/internal/observable/interval";
import { startWith, switchMap } from "rxjs/operators";
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';

//TODO: mucha logica para migrar al servidor
@Component({
  selector: 'app-vista-grilla',
  templateUrl: './vista-grilla.component.html',
  styleUrls: ['./vista-grilla.component.css']
})
export class VistaGrillaComponent implements OnInit {
    mapReles: Map<number, Array<boolean>> = new Map();

    //estado actual, cada elemento corresponde a un MAS
    estadoActual: EstadoMas[];
    interval: Subscription;
      
    constructor(private service: EstadoActualService,
        private puntoSensadoService: PuntoDeSensadoService,
        private compUmbralService: ComportamientoUmbralService,
        private compHoraService: ComportamientoHoraService,
        private activacionManualService: ActivacionManualService ) { }

    //esto hace polling cada 2.5 segundos recuperando el estado actual del servidor
    //TODO: hacer configurable o con constante al menos    
    ngOnInit() {
        this.interval = interval(2500)
        .pipe(
            startWith(0),
            switchMap(() => this.service.getEstadoActual())
        )
        .subscribe(data => {this.estadoActual = data;});
            
        //el cancer binario a continuacion obtiene para cada punto de sensado el tipo de activacion de los reles
        //en un map donde el key es el id del punto y el value es un array de 2 booleanos indicando true para manual
        //y false para no manual. Porque me interesa? porque solo pongo panel de control para los reles configurados en manual
        //porque no lo hice mejor? no tenia tiempo, ademas, los gustos hay que darselos en vida        
        var puntosDeSensado = new Array<PuntoDeSensado>();    
        var compsUmbral = new Array<ComportamientoUmbral>();  
        var compsHora = new Array<ComportamientoHora>();
        this.puntoSensadoService.getAll().subscribe(
            data => {
                puntosDeSensado = data;    
                this.compUmbralService.getAll().subscribe(
                    data => {
                        compsUmbral = data;
                        this.compHoraService.getAll().subscribe(
                            data => {
                                compsHora = data;
                                
                                for(let puntoSensado of puntosDeSensado) {
                                    if(!puntoSensado.habilitado) {
                                        continue;    
                                    }
                                    
                                    var esManual1: boolean = true;
                                    var esManual2: boolean = true;
                                    
                                    for(let cUmbral of compsUmbral) {
                                        if(cUmbral.idSensor == puntoSensado.sensorAsociado && cUmbral.habilitado) {
                                            if(!cUmbral.contactorSalida) {
                                                esManual1 = false;
                                            } else {
                                                esManual2 = false;
                                            }
                                        }
                                    }
                                    
                                    for(let cHora of compsHora) {
                                        if(cHora.idSensor == puntoSensado.sensorAsociado && cHora.habilitado) {
                                            if(!cHora.contactorSalida) {
                                                esManual1 = false;
                                            } else {
                                                esManual2 = false;
                                            }
                                        }
                                    }
                                    
                                    this.mapReles.set(puntoSensado.id, [esManual1, esManual2]);
                                }
                            }
                        )
                    }
                )             
            }
        );
    }
    
    activarRele(idPs: number, nroRele: number) {
        this.activacionManualService.activar(idPs, nroRele).subscribe(
            data => {
                console.log("activado");
                //mostrar msj Ok    
            }
        );
    }
    
    desactivarRele(idPs: number, nroRele: number) {
        this.activacionManualService.desactivar(idPs, nroRele).subscribe(
            data => {
                console.log("desactivado");
                //mostrar msj Ok    
            }
        );
    }

    ngOnDestroy() {
        this.interval.unsubscribe();
    }
}
