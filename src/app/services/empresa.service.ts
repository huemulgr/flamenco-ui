import { Injectable } from '@angular/core';
import { AbstractRestService } from "src/app/services/abstract-rest.service";
import { Empresa } from "src/app/model/empresa.model";
import { HttpClient }from '@angular/common/http';
import { SharedService } from 'src/app/services/shared.service';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError, empty } from 'rxjs';

export class RespuestaValidarClave {
  ok: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class EmpresaService extends AbstractRestService<Empresa> {  
    
    constructor(http: HttpClient, sharedService: SharedService) {
        super(http, "empresa/", sharedService);
    }
    
    obtenerEspacioLibre(periodo: number): Observable<any> {
        return this.http.get(this.apiUrl + "espacio-libre/" + periodo)
        .pipe(
            map((response: any) => response),
            catchError (super.handleError)
        );
    }    
    
    validarClave(pass: string): Observable<any> {
        var empresa = new Empresa();
        empresa.passwordConfiguracion = pass;
        empresa.id = 1000;
        
        return this.http.post(this.apiUrl + "validarClave/", empresa)
        .pipe(
            map((response: any) => response),
            catchError (super.handleError)
        );
    }
    
}