import { Component, OnInit } from '@angular/core';
import { Usuario } from "src/app/model/usuario.model";


@Component({
  selector: 'app-barra-menu',
  templateUrl: './barra-menu.component.html',
  styleUrls: ['./barra-menu.component.css']
})
export class BarraMenuComponent implements OnInit {
  usuarioLogeado: Usuario = JSON.parse(localStorage.getItem('currentUser'));
  
  constructor() { }

  ngOnInit() {
  }

  
}