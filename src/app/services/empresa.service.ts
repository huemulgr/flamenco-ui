import { Injectable } from '@angular/core';
import { AbstractRestService } from "src/app/services/abstract-rest.service";
import { Empresa } from "src/app/model/empresa.model";
import { HttpClient }from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class EmpresaService extends AbstractRestService<Empresa> {  
    
    constructor(http: HttpClient) {
        super(http, "empresa/");
    }
}