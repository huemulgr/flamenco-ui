import { Injectable } from '@angular/core';
import { AbstractRestService } from "src/app/services/abstract-rest.service";
import { Usuario } from "src/app/model/usuario.model";
import { SharedService } from 'src/app/services/shared.service';
import { HttpClient, HttpHeaders, HttpErrorResponse }from '@angular/common/http';
import { map, catchError } from "rxjs/operators";
import { Observable } from "rxjs";

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json'
    })
};    
    
@Injectable({
  providedIn: 'root'
})
    
export class UsuarioService extends AbstractRestService<Usuario> {  
    
    constructor(http: HttpClient, sharedService: SharedService) {
        super(http, "usuario/", sharedService);
    }
    
    autenticar(usr: string, pass: string): Observable<Usuario> {           
//        return 
        var usuario = new Usuario();
        usuario.nombreUsuario = usr;
        usuario.password = pass;
        
        return this.http.post(this.apiUrl + "login", usuario, httpOptions)
        .pipe(
            map((response:Usuario) => response),
            catchError (super.handleError)
        );        
    }
    
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}