import 'rxjs';
import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams }from '@angular/common/http';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError, empty } from 'rxjs';
import { AbstractRestService } from "src/app/services/abstract-rest.service";
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
export class ActivacionManualService extends AbstractRestService<boolean>{  
    
    constructor(http: HttpClient, sharedService: SharedService) {
        super(http, "manual/", sharedService);
    }
    
    activar(idPuntoDeSensado: number, nroRele: number): Observable<boolean> {
        
        var parametros = new HttpParams()
            .append('idPs', idPuntoDeSensado.toString())
            .append('nroRele', nroRele.toString());    
        
        return this.http.get(this.apiUrl+"on/", {params: parametros} )
        .pipe(
            map((response:boolean) => response),
            catchError (super.handleError)
        );
    }
    
    desactivar(idPuntoDeSensado: number, nroRele: number): Observable<boolean> {
        
        var parametros = new HttpParams()
            .append('idPs', idPuntoDeSensado.toString())
            .append('nroRele', nroRele.toString());    
        
        return this.http.get(this.apiUrl+"off/", {params: parametros} )
        .pipe(
            map((response:boolean) => response),
            catchError (super.handleError)
        );
    }
}
