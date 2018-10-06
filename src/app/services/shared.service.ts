import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
//service para compartir informacion entre componentes, 
//se usa principalmente para mostrar mensajes de error en cualquier pantalla     
export class SharedService {

  _msj: string;

  _msjSource: Subject<string> = new Subject();
  get msjSource() : Subject<string> {
    return this._msjSource;
  }
  set msjSource(src: Subject<string>) {
    this._msjSource = src;
  }

  constructor() { }

  changeMsj(msj: string) {
    this.msjSource.next(msj);
  }

}