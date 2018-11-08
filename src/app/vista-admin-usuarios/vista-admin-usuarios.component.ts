import { Component, OnInit } from '@angular/core';
import { PerfilService } from 'src/app/services/perfil.service';
import { ModalService } from 'src/app/services/modal.service';
import { Perfil } from 'src/app/model/perfil.model';
import { Sensor } from 'src/app/model/sensor.model';
import { SensorService } from 'src/app/services/sensor.service';
import { EmpresaService, RespuestaValidarClave } from 'src/app/services/empresa.service';
import { Empresa } from 'src/app/model/empresa.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-vista-admin-usuarios',
  templateUrl: './vista-admin-usuarios.component.html',
  styleUrls: ['./vista-admin-usuarios.component.css']
})
export class VistaAdminUsuariosComponent implements OnInit {
  perfiles: Perfil[];
  perfilSeleccionado: Perfil = new Perfil();  
  sensores: Sensor[] = [];  
  passConfig: string = "";    

  constructor(private perfilService: PerfilService, private modalService: ModalService, 
    private sensorService: SensorService,
    private service: EmpresaService,
    private location: Location
    ) { }

  ngOnInit() {
      this.getPerfiles();
      setTimeout(()=>{ this.openModal("popup-clave") }, 100);
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
  msjError = "";  
  validarClave() {
    this.service.validarClave(this.passConfig).subscribe(
        (data: RespuestaValidarClave) => {
            if(data.ok) {
                this.closeModal("popup-clave");    
            } else {
                this.msjError = "Clave incorrecta";
            }
        }
    );
  } 
    

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
    
  //TODO: refactor  
  getSensores() {
    this.sensorService.getAll().subscribe(
        (data) => {
            this.sensores = data;
        } 
    );    
  }    
  asignar=true;    
  sensorSeleccionado: Sensor = new Sensor();    
  onClickAgregarSensor(perfil) {
    this.getSensores();
    this.asignar = true;
    this.perfilSeleccionado = Object.assign({}, perfil);       
    this.modalService.open("popup-asignacion-sensor");      
  }
  onClickQuitarSensor(perfil) {
    this.getSensores();
    this.asignar = false;
    this.perfilSeleccionado = Object.assign({}, perfil);       
    this.modalService.open("popup-asignacion-sensor");      
  }      
  onSubmitSensor() {
    if(this.asignar) {
      this.perfilService.asignarSensor(this.perfilSeleccionado.id, this.sensorSeleccionado.id)
        .subscribe((data) => {              
            this.getPerfiles();
        } );      
    } else {
      this.perfilService.quitarSensor(this.perfilSeleccionado.id, this.sensorSeleccionado.id)
        .subscribe((data) => {
            this.getPerfiles();
        } );  
    }      
    this.modalService.close("popup-asignacion-sensor");   
  }          
  compareFn(c1: any, c2:any): boolean {     
    return c1 && c2 ? c1.id === c2.id : c1 === c2; 
  }   
    
    
  volver() {
    this.location.back();          
  }  
  onCancelar(id: string) {
    this.modalService.close(id);  
  }  
  openModal(id: string) {
      this.modalService.open(id);
  }
  closeModal(id: string) {
      this.modalService.close(id);
  }  
    
}