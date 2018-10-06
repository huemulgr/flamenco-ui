import { Injectable } from '@angular/core';
import { AbstractRestService } from "src/app/services/abstract-rest.service";
import { Planta } from "src/app/model/planta.model";
import { HttpClient }from '@angular/common/http';
import { SharedService } from 'src/app/services/shared.service';

@Injectable({
  providedIn: 'root'
})

export class PlantaService extends AbstractRestService<Planta> {  
    
    constructor(http: HttpClient, sharedService: SharedService) {
        super(http, "planta/", sharedService);
    }
}