import { Injectable } from '@angular/core';
import { AbstractRestService } from "src/app/services/abstract-rest.service";
import { Empresa } from "src/app/model/empresa.model";
import { HttpClient }from '@angular/common/http';
import { SharedService } from 'src/app/services/shared.service';

@Injectable({
  providedIn: 'root'
})

export class EmpresaService extends AbstractRestService<Empresa> {  
    
    constructor(http: HttpClient, sharedService: SharedService) {
        super(http, "empresa/", sharedService);
    }
}