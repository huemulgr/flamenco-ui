import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from "src/app/model/usuario.model";
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-abm-usuarios',
  templateUrl: './abm-usuarios.component.html',
  styleUrls: ['./abm-usuarios.component.css']
})
export class AbmUsuariosComponent implements OnInit {

  usuarioSeleccionado: Usuario = new Usuario();
  usuarios: Usuario[];
  repetirPassword: string;
  cambiaPassword: boolean = false;    
  msgErrorPass: boolean = false;
    
  constructor(private usuarioService: UsuarioService
        , private modalService: ModalService) { }

  ngOnInit() {
    this.getUsuarios();
  }

  getUsuarios() {
    this.usuarioService.getAll().subscribe(
        (data) => {   
            //group_concat en el sp genera un registro en null si no hay resultados, con filter lo elimino
            this.usuarios = data.filter(usuario => usuario.idusuario);
        } 
    );    
  }
  createUsuario() {
    this.usuarioService.create(this.usuarioSeleccionado)
      .subscribe(
          (data) => { 
            this.usuarioSeleccionado = data; 
            //actualizar listado  
            this.getUsuarios(); 
          }
      ); 
      this.modalService.close("popup-usuario");
  }
  updateUsuario() {
    this.usuarioService.update(this.usuarioSeleccionado)
      .subscribe(
          (data) => { 
            this.usuarioSeleccionado = data;
            //actualizar listado  
            this.getUsuarios(); 
          }
      );
    this.modalService.close("popup-usuario");
  }
  deleteUsuario() {
    this.usuarioService.deleteOne(this.usuarioSeleccionado.idusuario)
      .subscribe(
          (data) => { 
            this.usuarioSeleccionado = new Usuario();
            //actualizar listado
            this.getUsuarios();   
          }
      );
    //cerrar popup
    this.modalService.close("popup-eliminar-usuario");
  }    
       

  onClickAltaModif(usuario?: Usuario) {
    this.cambiaPassword = false;
    this.repetirPassword = "";
    this.msgErrorPass = false;
    if(usuario) {
      this.usuarioSeleccionado = Object.assign({}, usuario);  
    } else { 
      this.usuarioSeleccionado = new Usuario();
    }
    this.modalService.open("popup-usuario");      
  }
  onClickBaja(usuario: Usuario) {
    this.usuarioSeleccionado = Object.assign({}, usuario);
    this.modalService.open("popup-eliminar-usuario");    
  }    
    
  onSubmitUsuario() {
    //confirmacion de password, esto se hace con validaciones de angular 
    //pero siendo que casi no lo usamos y estoy bastante quemado lo dejo ad hoc
    if(this.usuarioSeleccionado.idusuario){
        if(this.cambiaPassword && this.usuarioSeleccionado.password != this.repetirPassword) {
          this.msgErrorPass = true;  
          return;
        }   
    } else {
        if(this.usuarioSeleccionado.password != this.repetirPassword) {
          this.msgErrorPass = true;
          return;
        }    
    }
    
    //update o insert segun corresponda
    if(this.usuarioSeleccionado.idusuario) {
        this.updateUsuario();    
    } else {
        this.createUsuario();    
    }
  }  
    
  onCancelar(idusuario: string) {
    this.modalService.close(idusuario);  
  }
    
}
