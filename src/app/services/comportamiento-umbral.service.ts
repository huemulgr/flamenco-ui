import { Injectable } from '@angular/core';
import { AbstractRestService } from "src/app/services/abstract-rest.service";
import { ComportamientoUmbral } from "src/app/model/comportamiento-umbral.model";
import { SharedService } from 'src/app/services/shared.service';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams }from '@angular/common/http';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError, empty } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ComportamientoUmbralService extends AbstractRestService<ComportamientoUmbral> {  
    
    constructor(http: HttpClient, protected sharedService: SharedService) {
        super(http, "cumbral/", sharedService);
    }
    
    configurarMas(cUmbral: ComportamientoUmbral): Observable<boolean> {          
        return this.http.post(this.apiUrl+"configurar/", cUmbral)
        .pipe(
            map((response:boolean) => response),
            catchError (super.handleError)
        );
    }
    
}