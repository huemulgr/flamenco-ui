import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from "src/app/model/usuario.model";
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario = new Usuario();
  returnUrl: string;

  constructor(private usuarioService: UsuarioService,
        private route: ActivatedRoute,
        private router: Router,
        private sharedService: SharedService) { }

  ngOnInit() {
    // reset login status
    this.usuarioService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.usuarioService.autenticar(this.usuario.nombreUsuario, this.usuario.password)
      .subscribe((data) => {
        var aux: Usuario = data;
              
          if(aux.idusuario > 0) {
            //ok    
            this.usuarioService.getOne(aux.idusuario).subscribe(
            (data) => {
                aux = data;
                localStorage.setItem('currentUser', JSON.stringify(data));
                this.router.navigate([this.returnUrl]);
              }
            );
                
          } else if(aux.idusuario == -1) {
            this.sharedService.changeMsj(
              'Contraseña incorrecta, por favor intente nuevamente.');            
          } else {                
            this.sharedService.changeMsj(
              'El usuario ingresado no existe.');
          }            
        });
  }
}
