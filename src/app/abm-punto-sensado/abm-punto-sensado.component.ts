import { Component, OnInit, ViewChild } from '@angular/core';
import { PuntoDeSensadoService } from 'src/app/services/punto-de-sensado.service';
import { PlantaService } from 'src/app/services/planta.service';
import { ModalService } from 'src/app/services/modal.service';
import { PuntoDeSensado } from "src/app/model/punto-de-sensado.model";
import { Planta } from "src/app/model/planta.model";

@Component({
  selector: 'app-abm-punto-sensado',
  templateUrl: './abm-punto-sensado.component.html',
  styleUrls: ['./abm-punto-sensado.component.css']
})
export class AbmPuntoSensadoComponent implements OnInit {
  puntosDeSensado: PuntoDeSensado[];
  puntoSensadoSeleccionado: PuntoDeSensado = new PuntoDeSensado();  
  @ViewChild("formPuntoSensado") formPuntoSensado: any; 
  plantas: Planta[] = new Array<Planta>();  
  plantaSeleccionada: Planta = new Planta();  
  resetPlanoModif: boolean = false;  
    
  constructor(private service: PuntoDeSensadoService, private plantasService: PlantaService,
    private modalService: ModalService) { }

  ngOnInit() {
      this.getPuntosDeSensado();
  }

  getPuntosDeSensado() {
    this.service.getAll()
      .subscribe(
          (data) => { 
              this.puntosDeSensado = data
              console.log(this.puntosDeSensado);
          }
      );
  }
  createPuntoDeSensado() {
    this.service.create(this.puntoSensadoSeleccionado)
      .subscribe(
          (data) => { 
            this.puntoSensadoSeleccionado = data; 
            //actualizar listado  
            this.getPuntosDeSensado(); 
          }
      ); 
      this.modalService.close("popup-puntoDeSensado");
  }
  updatePuntoDeSensado() {
    this.service.update(this.puntoSensadoSeleccionado)
      .subscribe(
          (data) => { 
            this.puntoSensadoSeleccionado = data;
            //actualizar listado  
            this.getPuntosDeSensado(); 
          }
      );
    this.modalService.close("popup-puntoDeSensado");
  }
  deletePuntoDeSensado() {
    this.service.deleteOne(this.puntoSensadoSeleccionado.id)
      .subscribe(
          (data) => { 
            this.puntoSensadoSeleccionado = new PuntoDeSensado();
            //actualizar listado
            this.getPuntosDeSensado();   
          }
      );
    //cerrar popup
    this.modalService.close("popup-eliminar-puntoDeSensado");
  }
    
  onSubmitPuntoDeSensado() {
    this.puntoSensadoSeleccionado.idPlanta = this.plantaSeleccionada.id;
    if(this.esAlta) {
      this.createPuntoDeSensado();    
    } else {
      this.updatePuntoDeSensado();
    }    
      
    this.marcarPlanoReinicio();
  }
  
  private esAlta: boolean;  
  inicializarPopupAltaModif() {
    this.resetPlanoModif = false;  
    this.getPlantas();
    this.modalService.open("popup-puntoDeSensado");
  }  
    
  onClickAlta() {
    this.inicializarPopupAltaModif();
    this.esAlta = true;
    this.puntoSensadoSeleccionado = new PuntoDeSensado();
  }
  onClickModif(puntoDeSensado: PuntoDeSensado) {
    this.inicializarPopupAltaModif();
    this.esAlta = false;
    this.puntoSensadoSeleccionado = puntoDeSensado;  
  }
  onClickBaja(puntoDeSensado: PuntoDeSensado) {
      this.puntoSensadoSeleccionado = puntoDeSensado;
      this.modalService.open("popup-eliminar-puntoDeSensado");
  }
    
  getPlantas() {
    this.plantasService.getAll().subscribe(
          (data) => { 
              this.plantas = data
          }
      );
  }          
    
  onCancelar(id: string) {
    this.modalService.close(id);
    this.marcarPlanoReinicio();
  }  
    
  marcarPlanoReinicio(){
    //esto obliga a que se reinicie el componente de plano y quede vacio para la proxima operacion  
    this.resetPlanoModif = true;  
    this.plantaSeleccionada = new Planta();  
  }  
}
