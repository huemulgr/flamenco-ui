import { Injectable } from '@angular/core';
import { AbstractRestService } from "src/app/services/abstract-rest.service";
import { ComportamientoHora } from "src/app/model/comportamiento-hora.model";
import { HttpClient }from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ComportamientoHoraService extends AbstractRestService<ComportamientoHora> {  
    
    constructor(http: HttpClient) {
        super(http, "chora/");
    }
    
    
}