import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AlarmaService } from 'src/app/services/alarma.service';
import { ModalService } from 'src/app/services/modal.service';
import { Alarma } from "src/app/model/alarma.model";
import { Sensor } from "src/app/model/sensor.model";

@Component({
  selector: 'app-abm-alarma',
  templateUrl: './abm-alarma.component.html',
  styleUrls: ['./abm-alarma.component.css']
})
export class AbmAlarmaComponent implements OnInit {

  alarmas: Alarma[];
  alarmaSeleccionada: Alarma = new Alarma();  
  @ViewChild("formAlarma") formAlarma: any;  
  @Input() sensor: Sensor;    
    
  constructor(private service: AlarmaService, private modalService: ModalService) { }

  ngOnInit() {
      this.getAlarmas();
  }
    
  getAlarmas() {
    this.service.getByIdJoin(this.sensor.id, "sensor/")
      .subscribe(
          (data) => { 
              this.alarmas = data
              console.log(this.alarmas);
          }
      );
  }
  createAlarma() {
    this.alarmaSeleccionada.idSensor = this.sensor.id;
    this.service.create(this.alarmaSeleccionada)
      .subscribe(
          (data) => { 
            this.alarmaSeleccionada = data; 
            //actualizar listado  
            this.getAlarmas(); 
          }
      ); 
      this.modalService.close("popup-alarma");
  }
  updateAlarma() {
    this.service.update(this.alarmaSeleccionada)
      .subscribe(
          (data) => { 
            //actualizar listado  
            this.getAlarmas(); 
          }
      );
    this.modalService.close("popup-alarma");
  }
  deleteAlarma() {
    this.service.deleteOne(this.alarmaSeleccionada.id)
      .subscribe(
          (data) => { 
            this.alarmaSeleccionada = new Alarma();
            //actualizar listado
            this.getAlarmas();   
          }
      );
    //cerrar popup
    this.modalService.close("popup-eliminar-alarma");
  }
    
  onSubmitAlarma() {
    if(this.esAlta) {
      this.createAlarma();    
    } else {
      this.alarmaSeleccionada.idSensor = this.sensor.id;
      this.updateAlarma();
    }    
  }
    
  private esAlta: boolean;  
  onClickAlta() {
      this.esAlta = true;
      this.alarmaSeleccionada = new Alarma();
      this.modalService.open("popup-alarma");
  }
  onClickModif(alarma: Alarma) {
      this.esAlta = false;
      this.alarmaSeleccionada = Object.assign({}, alarma);
      this.modalService.open("popup-alarma");
  }
  onClickBaja(alarma: Alarma) {
      this.alarmaSeleccionada = alarma;
      this.modalService.open("popup-eliminar-alarma");
  }
    
  onCancelar(id: string) {
    this.modalService.close(id);
  }  
}
