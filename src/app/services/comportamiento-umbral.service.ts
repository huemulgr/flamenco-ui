import { Injectable } from '@angular/core';
import { AbstractRestService } from "src/app/services/abstract-rest.service";
import { ComportamientoUmbral } from "src/app/model/comportamiento-umbral.model";
import { HttpClient }from '@angular/common/http';
import { SharedService } from 'src/app/services/shared.service';

@Injectable({
  providedIn: 'root'
})

export class ComportamientoUmbralService extends AbstractRestService<ComportamientoUmbral> {  
    
    constructor(http: HttpClient, sharedService: SharedService) {
        super(http, "cumbral/", sharedService);
    }
    
    
}