import { Component, OnInit, ViewChild } from '@angular/core';
import { PuntoDeSensado } from 'src/app/model/punto-de-sensado.model';
import { Sensor } from 'src/app/model/sensor.model';
import { PuntoDeSensadoService } from 'src/app/services/punto-de-sensado.service';
import { SensorService } from 'src/app/services/sensor.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-vista-configuracion-mas',
  templateUrl: './vista-configuracion-mas.component.html',
  styleUrls: ['./vista-configuracion-mas.component.css']
})
export class VistaConfiguracionMASComponent implements OnInit {
  @ViewChild("formMas") formGeneral: any;
  @ViewChild("formModal") formModal: any;
  sensorSeleccionado: Sensor = new Sensor();
  sensores: Sensor[] = new Array<Sensor>();   
  puntosDeSensado: PuntoDeSensado[] = new Array<PuntoDeSensado>();  
  puntoSensadoSeleccionado: PuntoDeSensado = undefined;  
    
  vistaAlarmas: boolean = false;  
  vistaComportamientos: boolean = false;  
    
  constructor(private service: SensorService, private puntoDeSensadoService: PuntoDeSensadoService,
    private modalService: ModalService) { 
  }

  ngOnInit() {
      this.getSensores();
      this.getPuntosDeSensado();
  }
  
  getPuntosDeSensado() {
    this.puntoDeSensadoService.getAll()
      .subscribe(
          (data) => { 
              this.puntosDeSensado = data
          }
      );
  }  
    
  getSensores() {
    this.service.getAll()
      .subscribe(
          (data) => { 
              this.sensores = data
          }
      );
  }
  createSensor() {
    this.service.create(this.sensorSeleccionado)
      .subscribe(
          (data) => { 
            this.sensorSeleccionado = data; 
            //actualizar listado  
            this.getSensores(); 
          }
      ); 
      this.modalService.close("popup-sensor");
  }
  updateSensor() {
    this.service.update(this.sensorSeleccionado)
      .subscribe(
          (data) => { 
            this.sensorSeleccionado = data;
            //actualizar listado  
            this.getSensores(); 
          }
      );
    this.modalService.close("popup-sensor");
  }
  deleteSensor() {
    this.service.deleteOne(this.sensorSeleccionado.id)
      .subscribe(
          (data) => { 
            this.sensorSeleccionado = new Sensor();
            //actualizar listado
            this.getSensores();   
          }
      );
    //cerrar popup
    this.modalService.close("popup-eliminar-sensor");
  }  

  private esAlta: boolean;    
  onClickAlta() {
    this.esAlta = true;
    this.sensorSeleccionado = new Sensor();
    this.modalService.open("popup-sensor");
  }
  onClickModif(sensor: Sensor) {
    this.esAlta = false;
    this.sensorSeleccionado = sensor;  
      console.log(this.sensorSeleccionado.idPuntoSensado == 1);
    this.modalService.open("popup-sensor");  
  }
  onClickBaja(sensor: Sensor) {
    this.sensorSeleccionado = sensor;
    this.modalService.open("popup-eliminar-sensor");
  }
  onClickAlertas(sensor) {
    this.sensorSeleccionado = sensor;
    this.vistaAlarmas = !this.vistaAlarmas;
  }   
  onClickComportamientos(sensor) {
    this.sensorSeleccionado = sensor;
    this.vistaComportamientos = !this.vistaComportamientos;  
  }   
    
  
  onSubmitSensor() {
    this.sensorSeleccionado.idPuntoSensado = this.puntoSensadoSeleccionado.id;
    if(this.esAlta) {
      this.createSensor();    
    } else {
      this.sensorSeleccionado.idTipoSensor = 1;
      this.updateSensor();
    }
  }  
  onCancelar(id: string) {
    this.modalService.close(id);
  }  
    
}