import { Injectable } from '@angular/core';
import { AbstractRestService } from "src/app/services/abstract-rest.service";
import { PuntoDeSensado } from "src/app/model/punto-de-sensado.model";
import { HttpClient }from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class PuntoDeSensadoService extends AbstractRestService<PuntoDeSensado> {  
    
    constructor(http: HttpClient) {
        super(http, "puntodesensado/");
    }
}