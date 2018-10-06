import { Component, OnInit } from '@angular/core';
import { PerfilService } from 'src/app/services/perfil.service';
import { ModalService } from 'src/app/services/modal.service';
import { Perfil } from 'src/app/model/perfil.model';

@Component({
  selector: 'app-vista-admin-usuarios',
  templateUrl: './vista-admin-usuarios.component.html',
  styleUrls: ['./vista-admin-usuarios.component.css']
})
export class VistaAdminUsuariosComponent implements OnInit {
  perfiles: Perfil[];
  perfilSeleccionado: Perfil = new Perfil();  
    
  constructor(private perfilService: PerfilService, private modalService: ModalService) { }

  ngOnInit() {
      this.getPerfiles();
  }
    
  getPerfiles() {
    this.perfilService.getAll().subscribe(
        (data) => {   
            //group_concat en el sp genera un registro en null si no hay resultados, con filter lo elimino
            this.perfiles = data.filter(perfil => perfil.id);
        } 
    );    
  }
  createPerfil() {
    this.perfilService.create(this.perfilSeleccionado)
      .subscribe(
          (data) => { 
            this.perfilSeleccionado = data; 
            //actualizar listado  
            this.getPerfiles(); 
          }
      ); 
      this.modalService.close("popup-perfil");
  }
  updatePerfil() {
    this.perfilService.update(this.perfilSeleccionado)
      .subscribe(
          (data) => { 
            this.perfilSeleccionado = data;
            //actualizar listado  
            this.getPerfiles(); 
          }
      );
    this.modalService.close("popup-perfil");
  }
  deletePerfil() {
    this.perfilService.deleteOne(this.perfilSeleccionado.id)
      .subscribe(
          (data) => { 
            this.perfilSeleccionado = new Perfil();
            //actualizar listado
            this.getPerfiles();   
          }
      );
    //cerrar popup
    this.modalService.close("popup-eliminar-perfil");
  }      
//  getUsuarios() {
//    this.perfilService.getByIdJoin(this.perfilSeleccionado.id, "perfil/")
//      .subscribe(
//        (data) => { } 
//    );    
//  }
//  getSensores() {
//    this.perfilService.getByIdJoin(this.sensorSeleccionado.id, "sensor/")
//      .subscribe(
//        (data) => { } 
//    );    
//  }  
       

  onClickAltaModif(perfil?: Perfil) {
    if(perfil) {
      this.perfilSeleccionado = Object.assign({}, perfil);  
    } else { 
      this.perfilSeleccionado = new Perfil();
    }
    this.modalService.open("popup-perfil");      
  }
  onClickBaja(perfil: Perfil) {
    this.perfilSeleccionado = Object.assign({}, perfil);
    this.modalService.open("popup-eliminar-perfil");    
  }    
    
  onSubmitPerfil() {
    if(this.perfilSeleccionado.id) {
        this.updatePerfil();    
    } else {
        this.createPerfil();    
    }
  }  
    
  onCancelar(id: string) {
    this.modalService.close(id);  
  }  
    
}