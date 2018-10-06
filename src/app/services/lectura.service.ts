import 'rxjs';
import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams }from '@angular/common/http';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError, empty } from 'rxjs';
import { AbstractRestService } from "src/app/services/abstract-rest.service";
import { Lectura } from "src/app/model/lectura.model";
import { SharedService } from 'src/app/services/shared.service';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json'
    })
};

@Injectable({
  providedIn: 'root'
})

//Servicio para obtener lecturas para curvas de frio
export class LecturaService extends AbstractRestService<Lectura>{  
    
    constructor(http: HttpClient, sharedService: SharedService) {
        super(http, "lectura", sharedService);
    }
    
    getLecturas(idPuntoDeSensado: number, fechaDesde: string, fechaHasta: string): Observable<Lectura[]> {
        
        var parametros = new HttpParams()
            .append('idPuntoDeSensado', idPuntoDeSensado.toString())
            .append('fechaDesde', fechaDesde)
            .append('fechaHasta', fechaHasta);    
        
        return this.http.get(this.apiUrl, {params: parametros} )
        .pipe(
            map((response:Lectura[]) => response),
            catchError (super.handleError)
        );
    }
}
