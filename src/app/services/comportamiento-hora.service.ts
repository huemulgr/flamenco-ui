import { Injectable } from '@angular/core';
import { AbstractRestService } from "src/app/services/abstract-rest.service";
import { ComportamientoHora } from "src/app/model/comportamiento-hora.model";
import { SharedService } from 'src/app/services/shared.service';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams }from '@angular/common/http';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError, empty } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ComportamientoHoraService extends AbstractRestService<ComportamientoHora> {  
    
    constructor(http: HttpClient, protected sharedService: SharedService) {
        super(http, "chora/", sharedService);
    }
    
    configurarMas(cHora: ComportamientoHora): Observable<boolean> {        
        return this.http.post(this.apiUrl+"configurar/", cHora)
        .pipe(
            map((response:boolean) => response),
            catchError (super.handleError)
        );
    }
}