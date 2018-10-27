import { Component, OnInit } from '@angular/core';
import { Usuario } from "src/app/model/usuario.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  usuarioLogeado: Usuario = JSON.parse(localStorage.getItem('currentUser'));

  constructor() { }

  ngOnInit() {
  }

}
