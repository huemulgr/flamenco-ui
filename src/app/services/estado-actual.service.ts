import 'rxjs';
import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse }from '@angular/common/http';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError, empty } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';

import { EstadoMas } from "src/app/model/estado-mas.model";

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json'
    })
};

@Injectable({
  providedIn: 'root'
})

//Servicio para comunicacion con servidor local a traves de rest. en otro momento podria 
//convenir hacer mas granularidad teniendo 1 servicio por entidad        
export class EstadoActualService {  

    private estadoActualUrl = 'http://localhost:8080/flamenco-server/test/estadoactual/';
    
    constructor(private http: HttpClient) {
    }
    
    getEstadoActual(): Observable<EstadoMas[]> {
        return this.http.get(this.estadoActualUrl)
        .pipe(
            map((response:EstadoMas[]) => response),
            catchError (this.handleErrorEstadoActual)
        );
    }
    
    //handler para errores en polling de estado actual, distinto al de los abm
    private handleErrorEstadoActual(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return empty();
    };
}
