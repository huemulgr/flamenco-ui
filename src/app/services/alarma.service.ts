import { Injectable } from '@angular/core';
import { AbstractRestService } from "src/app/services/abstract-rest.service";
import { Alarma } from "src/app/model/alarma.model";
import { HttpClient }from '@angular/common/http';
import { SharedService } from 'src/app/services/shared.service';

@Injectable({
  providedIn: 'root'
})

export class AlarmaService extends AbstractRestService<Alarma> {  
    
    constructor(http: HttpClient, sharedService: SharedService) {
        super(http, "alarma/", sharedService);
    }
    
    
}