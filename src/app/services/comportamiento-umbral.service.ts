import { Injectable } from '@angular/core';
import { AbstractRestService } from "src/app/services/abstract-rest.service";
import { ComportamientoUmbral } from "src/app/model/comportamiento-umbral.model";
import { HttpClient }from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ComportamientoUmbralService extends AbstractRestService<ComportamientoUmbral> {  
    
    constructor(http: HttpClient) {
        super(http, "cumbral/");
    }
    
    
}