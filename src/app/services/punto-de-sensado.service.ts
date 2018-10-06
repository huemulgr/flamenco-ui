import { Injectable } from '@angular/core';
import { AbstractRestService } from "src/app/services/abstract-rest.service";
import { PuntoDeSensado } from "src/app/model/punto-de-sensado.model";
import { HttpClient }from '@angular/common/http';
import { SharedService } from 'src/app/services/shared.service';

@Injectable({
  providedIn: 'root'
})

export class PuntoDeSensadoService extends AbstractRestService<PuntoDeSensado> {  
    
    constructor(http: HttpClient, protected sharedService: SharedService) {
        super(http, "puntodesensado/", sharedService);
    }
}