import { Injectable } from '@angular/core';
import { AbstractRestService } from "src/app/services/abstract-rest.service";
import { Perfil } from "src/app/model/perfil.model";
import { HttpClient }from '@angular/common/http';
import { SharedService } from 'src/app/services/shared.service';

@Injectable({
  providedIn: 'root'
})

export class PerfilService extends AbstractRestService<Perfil> {  
    
    constructor(http: HttpClient, sharedService: SharedService) {
        super(http, "perfil/", sharedService);
    }
    
    
}