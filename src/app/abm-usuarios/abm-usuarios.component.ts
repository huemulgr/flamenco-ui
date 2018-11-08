import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from "src/app/model/usuario.model";
import { ModalService } from 'src/app/services/modal.service';
import { PerfilService } from 'src/app/services/perfil.service';
import { Perfil } from 'src/app/model/perfil.model';

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
  perfiles: Perfil[] = [];    

  constructor(private usuarioService: UsuarioService
        , private modalService: ModalService,
        private perfilService: PerfilService) { }

  ngOnInit() {
    this.getUsuarios();
    
    this.usuarioService.autenticar("Jair", "123");
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
    //TODO: ver reemplazo por validaciones de angular
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
      
  getPerfiles() {
    this.perfilService.getAll().subscribe(
        (data) => {   
            //group_concat en el sp genera un registro en null si no hay resultados, con filter lo elimino
            this.perfiles = data.filter(perfil => perfil.id);
        } 
    );    
  }    
  asignar=true;    
  perfilSeleccionado: Perfil = new Perfil();    
  onClickAgregarPerfil(usuario) {
    this.getPerfiles();
    this.asignar = true;
    this.usuarioSeleccionado = Object.assign({}, usuario);       
    this.modalService.open("popup-asignacion");      
  }
  onClickQuitarPerfil(usuario) {
    this.getPerfiles();
    this.asignar = false;
    this.usuarioSeleccionado = Object.assign({}, usuario);       
    this.modalService.open("popup-asignacion");      
  }      
  onSubmitPerfil() {
    if(this.asignar) {
      this.perfilService.asignarPerfil(this.perfilSeleccionado.id, this.usuarioSeleccionado.idusuario)
        .subscribe((data) => {             
            this.modalService.close("popup-asignacion");  
            this.getUsuarios();
        } );      
    } else {
      this.perfilService.quitarPerfil(this.perfilSeleccionado.id, this.usuarioSeleccionado.idusuario)
        .subscribe((data) => {             
            this.modalService.close("popup-asignacion");  
            this.getUsuarios();
        } );  
    }      
  }          
  compareFn(c1: any, c2:any): boolean {     
    return c1 && c2 ? c1.id === c2.id : c1 === c2; 
  }  
    
  onCancelar(idusuario: string) {
    this.modalService.close(idusuario);  
  }
    
}
