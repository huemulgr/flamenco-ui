import { Injectable } from '@angular/core';
import { AbstractRestService } from "src/app/services/abstract-rest.service";
import { Usuario } from "src/app/model/usuario.model";
import { HttpClient }from '@angular/common/http';
import { SharedService } from 'src/app/services/shared.service';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService extends AbstractRestService<Usuario> {  
    
    constructor(http: HttpClient, sharedService: SharedService) {
        super(http, "usuario/", sharedService);
    }
    
    
}