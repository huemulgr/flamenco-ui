import { Injectable } from '@angular/core';
import { AbstractRestService } from "src/app/services/abstract-rest.service";
import { PuntoDeSensado } from "src/app/model/punto-de-sensado.model";
import { HttpClient }from '@angular/common/http';
import { SharedService } from 'src/app/services/shared.service';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError, empty } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PuntoDeSensadoService extends AbstractRestService<PuntoDeSensado> {  
    
    constructor(http: HttpClient, protected sharedService: SharedService) {
        super(http, "puntodesensado/", sharedService);
    }
    
//    getAlarmasOn(): Observable<any> {     
    getAlarmasOn() {           
//        return 
        this.http.get(this.apiUrl+"alarmasOn")
        .pipe(
            map((response:any) => response),
            catchError (super.handleError)
        )
        .subscribe((data) => {
            this.alarmasOn = data;
        })    
        ;
    }
    
    
    alarmasOn: number[]; 
    estaEnAlarma(idPuntoSensado: number) {
        for(let alarma of this.alarmasOn) {
           if(idPuntoSensado && alarma == idPuntoSensado) {
               debugger;
               return true;  
           }
        }
    }
}