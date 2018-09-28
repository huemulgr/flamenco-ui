import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ComportamientoHoraService } from 'src/app/services/comportamiento-hora.service';
import { ModalService } from 'src/app/services/modal.service';
import { ComportamientoHora } from "src/app/model/comportamiento-hora.model";
import { ComportamientoUmbral } from "src/app/model/comportamiento-umbral.model";
import { Sensor } from "src/app/model/sensor.model";

@Component({
  selector: 'app-abm-comportamientos',
  templateUrl: './abm-comportamientos.component.html',
  styleUrls: ['./abm-comportamientos.component.css']
})
export class AbmComportamientosComponent implements OnInit {

  comportamientosHora: ComportamientoHora[];
  comportamientoHoraSeleccionado: ComportamientoHora = new ComportamientoHora();  
  @ViewChild("formComportamientoHora") formComportamientoHora: any;  
  @Input() sensor: Sensor;    
    
  constructor(private service: ComportamientoHoraService, private modalService: ModalService) { }

  ngOnInit() {
      this.getComportamientoHoras();
  }
    
  getComportamientoHoras() {
    this.service.getByIdJoin(this.sensor.id, "sensor/")
      .subscribe(
          (data) => { 
              this.comportamientosHora = data
              console.log(this.comportamientosHora);
          }
      );
  }
  createComportamientoHora() {
    this.service.create(this.comportamientoHoraSeleccionado)
      .subscribe(
          (data) => { 
            this.comportamientoHoraSeleccionado = data; 
            //actualizar listado  
            this.getComportamientoHoras(); 
          }
      ); 
      this.modalService.close("popup-comportamientoHora");
  }
  updateComportamientoHora() {
    this.service.update(this.comportamientoHoraSeleccionado)
      .subscribe(
          (data) => { 
            this.comportamientoHoraSeleccionado = data;
            //actualizar listado  
            this.getComportamientoHoras(); 
          }
      );
    this.modalService.close("popup-comportamientoHora");
  }
  deleteComportamientoHora() {
    this.service.deleteOne(this.comportamientoHoraSeleccionado.id)
      .subscribe(
          (data) => { 
            this.comportamientoHoraSeleccionado = new ComportamientoHora();
            //actualizar listado
            this.getComportamientoHoras();   
          }
      );
    //cerrar popup
    this.modalService.close("popup-eliminar-comportamientoHora");
  }
    
  onSubmitComportamientoHora() {
    if(this.esAlta) {
      this.createComportamientoHora();    
    } else {
      this.comportamientoHoraSeleccionado.idSensor = this.sensor.id;
      this.updateComportamientoHora();
    }    
  }
    
  private esAlta: boolean;  
  onClickAlta() {
      this.esAlta = true;
      this.comportamientoHoraSeleccionado = new ComportamientoHora();
      this.modalService.open("popup-comportamientoHora");
  }
  onClickModif(comportamientoHora: ComportamientoHora) {
      this.esAlta = false;
      this.comportamientoHoraSeleccionado = comportamientoHora;
      this.modalService.open("popup-comportamientoHora");
  }
  onClickBaja(comportamientoHora: ComportamientoHora) {
      this.comportamientoHoraSeleccionado = comportamientoHora;
      this.modalService.open("popup-eliminar-comportamientoHora");
  }
    
  onCancelar(id: string) {
    this.modalService.close(id);
  }  
}
