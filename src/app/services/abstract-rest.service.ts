import { HttpClient, HttpHeaders, HttpErrorResponse }from '@angular/common/http';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError, empty } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';
import { Subject } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json'
    })
};

export abstract class AbstractRestService<T> {
//  protected apiUrl = "https://"+ window.location.host +"/flamenco-server/test/";  
  protected apiUrl = "http://localhost:8080/flamenco-server/test/";  
  
        
  constructor(protected http: HttpClient, protected actionUrl:string, 
        protected sharedService: SharedService){
      
      this.apiUrl = this.apiUrl + actionUrl; 
  }
    
  getAll():Observable<T[]> {
    return this.http.get(this.apiUrl)
        .pipe(
            map((response: T[]) => response),
            catchError ((error) => this.handleError(error))
        );  
  }
  getOne(id:number):Observable<T> {
    return this.http.get<T>(this.apiUrl + id)
        .pipe(
            map((response: T) => response),
            catchError ((error) => this.handleError(error))
        );
  }
  getByIdJoin(id: number, urlJoin: string):Observable<T[]> {
    return this.http.get(this.apiUrl + urlJoin + id)
        .pipe(
            map((response: T[]) => response),
            catchError (this.handleError)
        );  
  }  
  update(object: T): Observable<T> {
      return this.http.put<T>(this.apiUrl, object, httpOptions)
      .pipe(
          map((response: T) => response),
          catchError ((error) => this.handleError(error))
      );
  }  
  create(object: T): Observable<T> {
      return this.http.post<T>(this.apiUrl, object, httpOptions)
      .pipe(
          map((response:T) => response),
          catchError ((error) => this.handleError(error))
      );
  }
  deleteOne(id: number): Observable<T> {
      return this.http.delete<T>(this.apiUrl + id, httpOptions)
      .pipe(
          map((response: T) => response),
          catchError ((error) => this.handleError(error))
      );  
  }  

    
//esto x ahora setea un mensaje identico para cualquier error, habria que filtrar por status
//y o bien setear aca los mensajes (no me opongo) o hacerlo desde el backend
    handleError(error: HttpErrorResponse) {
        console.log('nn');    
        console.log(this);  
        if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);  
        this.sharedService.changeMsj('Ha ocurrido un error inesperado: \n' + error.error.message);    
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
            `Backend returned code ${error.status}, ` +
            `body was: (${JSON.stringify(error.error)})`);
            this.sharedService.changeMsj(
                'Ha ocurrido un error inesperado: \n' + JSON.stringify(error.error));
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
    };   
    
} 