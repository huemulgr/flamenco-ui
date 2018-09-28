import { Component, OnInit } from '@angular/core';
import { EstadoActualService } from "src/app/services/estado-actual.service";
import { EstadoMas } from "src/app/model/estado-mas.model";
import { interval } from "rxjs/internal/observable/interval";
import { startWith, switchMap } from "rxjs/operators";
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vista-grilla',
  templateUrl: './vista-grilla.component.html',
  styleUrls: ['./vista-grilla.component.css']
})
export class VistaGrillaComponent implements OnInit {


    //estado actual, cada elemento corresponde a un MAS
    estadoActual: EstadoMas[];
    interval: Subscription;
      
    constructor(private service: EstadoActualService ) { }

    //esto hace polling cada 5 segundos recuperando el estado actual del servidor
    //TODO: hacer configurable o con constante al menos    
    ngOnInit() {
        this.interval = interval(2500)
        .pipe(
            startWith(0),
            switchMap(() => this.service.getEstadoActual())
        )
        .subscribe(data => {this.estadoActual = data; console.log(data);});
    }

    ngOnDestroy() {
        this.interval.unsubscribe();
    }
}
