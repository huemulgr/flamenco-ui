import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ComportamientoHoraService } from 'src/app/services/comportamiento-hora.service';
import { ComportamientoUmbralService } from 'src/app/services/comportamiento-umbral.service';
import { ModalService } from 'src/app/services/modal.service';
import { ComportamientoHora } from "src/app/model/comportamiento-hora.model";
import { ComportamientoUmbral } from "src/app/model/comportamiento-umbral.model";
import { Sensor } from "src/app/model/sensor.model";

//TODO: casi el 100% de esta logica habria que migrarla al server la hice aca porque soy un idiota contento
@Component({
  selector: 'app-abm-comportamientos',
  templateUrl: './abm-comportamientos.component.html',
  styleUrls: ['./abm-comportamientos.component.css']
})
export class AbmComportamientosComponent implements OnInit {

  readonly MANUAL=0;
  readonly UMBRAL=1;
  readonly HORA=2;    
    
  @Input() sensor: Sensor;    
  tipoComportamiento: number[] = [ this.MANUAL, this.MANUAL ];   
  tipoComportamientoActivo: number[] = [ this.MANUAL, this.MANUAL ];  
  numeroRele: number = 1;  
  cHoraS: ComportamientoHora[] = [ new ComportamientoHora(), new ComportamientoHora() ];
  cUmbralS: ComportamientoUmbral[] = [ new ComportamientoUmbral(), new ComportamientoUmbral() ];
  cHoraSeleccionado: ComportamientoHora = new ComportamientoHora();  
  cUmbralSeleccionado: ComportamientoUmbral = new ComportamientoUmbral(); 
    
  constructor(private cHoraService: ComportamientoHoraService, 
        private modalService: ModalService, 
        private cUmbralService: ComportamientoUmbralService) { 
  }

  ngOnInit() {
      this.getComportamientos();
  }
    
  getComportamientos() {
    var tipoCompActivo = [this.MANUAL, this.MANUAL];  
    this.cHoraService.getByIdJoin(this.sensor.id, "sensor/")
      .subscribe(
        (data) => { 
            var comportamientosHora = data            
            
            //separar los datos recibidos por rele de salida
            for(let cHora of comportamientosHora) {
              if(cHora) {
                //si contactorSalida es false es el rele numero 1, si es true el 2  
                //solo un tipo esta habilitado a la vez por rele, si no hay ninguno es manual  
                if(!cHora.contactorSalida) {
                  this.cHoraS[0] = cHora; 
                  if(cHora.habilitado) {
                    tipoCompActivo[0] = this.HORA;  
                  }      
                } else {
                  this.cHoraS[1] = cHora;
                  if(cHora.habilitado) {
                    tipoCompActivo[1] = this.HORA;  
                  }   
                }
              }
            }
            
            //actualizar inputs
            this.seleccionarRele(this.numeroRele);
            //los arrays se tienen que clonar
            this.tipoComportamiento = Object.assign({}, tipoCompActivo);
            this.tipoComportamientoActivo = Object.assign({}, tipoCompActivo);
        debugger;
        }
      );      
    //lo mismo para los comportamientos tipo umbral  
    this.cUmbralService.getByIdJoin(this.sensor.id, "sensor/")
      .subscribe(
        (data) => { 
            var comportamientosUmbral = data
             
            for(let cUmbral of comportamientosUmbral) {
              if(cUmbral) {
                if(!cUmbral.contactorSalida) {
                  this.cUmbralS[0] = cUmbral;  
                  if(cUmbral.habilitado) {
                    tipoCompActivo[0] = this.UMBRAL;  
                  }    
                } else {
                  this.cUmbralS[1] = cUmbral;
                  if(cUmbral.habilitado) {
                    tipoCompActivo[1] = this.UMBRAL;  
                  }  
                }
              }               
            }
            
            this.seleccionarRele(this.numeroRele);
            this.tipoComportamiento = Object.assign({}, tipoCompActivo);
            this.tipoComportamientoActivo = Object.assign({}, tipoCompActivo);
        debugger;
        }
      );  
  }
    
  //alta y modificacion  
  createComportamientoHora() {
    this.cHoraSeleccionado.idSensor = this.sensor.id;  
    this.cHoraSeleccionado.contactorSalida = this.numeroRele==2 ? true: false;   
    this.cHoraService.create(this.cHoraSeleccionado)
      .subscribe( 
          (data) => { 
            this.cHoraSeleccionado = data;
            this.getComportamientos();  
          }
      );
  }
  updateComportamientoHora(cHora: ComportamientoHora) {
    this.cHoraService.update(cHora)
      .subscribe(
          (data) => { 
            this.cHoraSeleccionado = data;
            this.getComportamientos();  
          }
      );
  }    
  createComportamientoUmbral() {
    this.cUmbralSeleccionado.idSensor = this.sensor.id;  
    this.cUmbralSeleccionado.contactorSalida = this.numeroRele==2 ? true: false;   
    this.cUmbralService.create(this.cUmbralSeleccionado)
      .subscribe( 
          (data) => {  
            this.getComportamientos();
          }
      );
  }
  updateComportamientoUmbral(cUmbral: ComportamientoUmbral) {
    this.cUmbralService.update(cUmbral)
      .subscribe(
          (data) => {  
            this.getComportamientos();
          }
      );
  } 
    
    
  cambiarTipoComportamiento() {
    if(this.tipoComportamientoActivo[this.numeroRele-1] == this.UMBRAL) {
      //desactivar comportamiento por umbral en uso  
      this.cUmbralS[this.numeroRele-1].habilitado = false;  
      this.cUmbralService.update(this.cUmbralS[this.numeroRele-1])
      .subscribe(
          (data) => { 
            //si se completo el desactivado entonces intenta activar el nuevo
            this.persistirComportamiento(this.tipoComportamiento[this.numeroRele-1]);  
            this.getComportamientos();   
          }
          //si esta activacion falla, 
          //quedarian ambos desactivados y cae por default a manual
      );      
    } else if (this.tipoComportamientoActivo[this.numeroRele-1] == this.HORA) {
      //desactivar comportamiento por hora en uso  
      this.cHoraS[this.numeroRele-1].habilitado = false;  
      this.cHoraService.update(this.cHoraS[this.numeroRele-1])
      .subscribe(
          (data) => { 
            //si se completo el desactivado entonces intenta activar el nuevo
            this.persistirComportamiento(this.tipoComportamiento[this.numeroRele-1]);
          }
          //si esta activacion falla, 
          //quedarian ambos desactivados y cae por default a manual
      );    
    } else {
      //si estaba en manual no hace falta desactivar
      this.persistirComportamiento(this.tipoComportamiento[this.numeroRele-1]);
    }     
  }  
    
  //intenta guardar en base de datos el nuevo comportamiento activo  
  persistirComportamiento(codigoTipo: number) {
    if(codigoTipo == this.UMBRAL) {
      this.cUmbralSeleccionado.habilitado=true;  
      this.cUmbralSeleccionado.idSensor = this.sensor.id;
              
      //se envia el mensaje de configuracion, si hubo exito se continua
      this.cUmbralService.configurarMas(this.cUmbralSeleccionado).subscribe(  
        data => {
          if(this.comprobarEsAlta()) {   
            this.createComportamientoUmbral();    
          } else {
            this.updateComportamientoUmbral(this.cUmbralSeleccionado);
          }
          
          this.getComportamientos();            
        }
      ); 
    } else if(codigoTipo == this.HORA) {
      this.cHoraSeleccionado.habilitado=true;  
      this.cHoraSeleccionado.idSensor = this.sensor.id;
      
      //se envia el mensaje de configuracion, si hubo exito se continua
      this.cHoraService.configurarMas(this.cHoraSeleccionado).subscribe(  
        data => {  
          if(this.comprobarEsAlta()) {   
            this.createComportamientoHora();    
          } else {
            this.updateComportamientoHora(this.cHoraSeleccionado);
          }   
          this.getComportamientos();       
        }
        
      );  
    }
    //si es manual, equivale a no tener nada habilitado  
  }
  
  //comprueba si dar de alta o modificar, 
  //para esta instancia vamos a tener como maximo 1 tipo de comportamiento por rele
  //asi que casi siempre sera update   
  comprobarEsAlta() {
    if(this.tipoComportamiento[this.numeroRele-1]==this.UMBRAL) {
      if(!this.cUmbralSeleccionado.id) {
        return true;
      }
    } else if(this.tipoComportamiento[this.numeroRele-1]==this.HORA) {
      if(!this.cHoraSeleccionado.id) {
        return true;
      }  
    }
    return false; 
  }  
    
  seleccionarRele(numero: number) {
    this.numeroRele = numero;  
    if(numero == 2) {
        this.cHoraSeleccionado = this.cHoraS[1];
        this.cUmbralSeleccionado = this.cUmbralS[1];
    } else {
        this.cHoraSeleccionado = this.cHoraS[0];
        this.cUmbralSeleccionado = this.cUmbralS[0];
    }
  }  
    
  onCancelar(id: string) {
    this.modalService.close(id);
  }  
}
