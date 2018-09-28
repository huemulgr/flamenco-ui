import { HttpClient, HttpHeaders, HttpErrorResponse }from '@angular/common/http';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError, empty } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json'
    })
};

export abstract class AbstractRestService<T> {
  private apiUrl = "http://localhost:8080/flamenco-server/test/";  
    
  constructor(protected http: HttpClient, protected actionUrl:string){
      this.apiUrl = this.apiUrl + actionUrl; 
  }
    
  getAll():Observable<T[]> {
    return this.http.get(this.apiUrl)
        .pipe(
            map((response: T[]) => response),
            catchError (this.handleError)
        );  
  }
  getOne(id:number):Observable<T> {
    return this.http.get<T>(this.apiUrl + id)
        .pipe(
            map((response: T) => response),
            catchError(this.handleError)
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
          catchError(this.handleError)
      );
  }  
  create(object: T): Observable<T> {
      return this.http.post<T>(this.apiUrl, object, httpOptions)
      .pipe(
          map((response:T) => response),
          catchError(this.handleError)
      );
  }
  deleteOne(id: number): Observable<T> {
      return this.http.delete<T>(this.apiUrl + id, httpOptions)
      .pipe(
          map((response: T) => response),
          catchError(this.handleError)
      );  
  }  
    
    
//esto x ahora solo escribe en consola, si se puede aca mismo generar un popup seria un golazo
    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
            `Backend returned code ${error.status}, ` +
            `body was: (${JSON.stringify(error.error)})`);
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
    };   
    
} 