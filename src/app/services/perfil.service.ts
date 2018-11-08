import { Injectable } from '@angular/core';
import { AbstractRestService } from "src/app/services/abstract-rest.service";
import { Perfil } from "src/app/model/perfil.model";
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams }from '@angular/common/http';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError, empty } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';

@Injectable({
  providedIn: 'root'
})

export class PerfilService extends AbstractRestService<Perfil> {  
    
    constructor(http: HttpClient, sharedService: SharedService) {
        super(http, "perfil/", sharedService);
    }
    
    //TODO: refactor
    asignarPerfil(idPerfil: number, idUsuario: number): Observable<any[]> {        
        var parametros = new HttpParams()
            .append('idPerfil', '' + idPerfil)
            .append('idUsuario', '' + idUsuario);    
        
        return this.http.get(this.apiUrl + "asignarUsuario", {params: parametros} )
        .pipe(
            map((response:any[]) => response),
            catchError (super.handleError)
        );
    }    
    asignarSensor(idPerfil: number, idSensor: number): Observable<any[]> {        
        var parametros = new HttpParams()
            .append('idPerfil', '' + idPerfil)
            .append('idSensor', '' + idSensor);    
        
        return this.http.get(this.apiUrl + "asignarSensor", {params: parametros} )
        .pipe(
            map((response:any[]) => response),
            catchError (super.handleError)
        );
    }
    
    quitarPerfil(idPerfil: number, idUsuario: number): Observable<any[]> {        
        var parametros = new HttpParams()
            .append('idPerfil', '' + idPerfil)
            .append('idUsuario', '' + idUsuario);    
        
        return this.http.delete(this.apiUrl + "quitarUsuario", {params: parametros} )
        .pipe(
            map((response:any[]) => response),
            catchError (super.handleError)
        );
    }
    
    quitarSensor(idPerfil: number, idSensor: number): Observable<any[]> {        
        var parametros = new HttpParams()
            .append('idPerfil', '' + idPerfil)
            .append('idSensor', '' + idSensor);    
        
        return this.http.delete(this.apiUrl + "quitarSensor", {params: parametros} )
        .pipe(
            map((response:any[]) => response),
            catchError (super.handleError)
        );
    }
}