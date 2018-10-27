import { Component, OnInit, ViewChild } from '@angular/core';
import { PlantaService } from 'src/app/services/planta.service';
import { ModalService } from 'src/app/services/modal.service';
import { Planta } from "src/app/model/planta.model";

@Component({
  selector: 'app-abm-planta',
  templateUrl: './abm-planta.component.html',
  styleUrls: ['./abm-planta.component.css']
})
export class AbmPlantaComponent implements OnInit {

  plantas: Planta[];
  plantaSeleccionada: Planta = new Planta();  
  @ViewChild("formPlanta") formPlanta: any;  
    
  constructor(private service: PlantaService, private modalService: ModalService) { }

  ngOnInit() {
      //le pongo un delay para que en su pantalla sea lo ultimo que se llame y no bloquee la base
      //evita demora para mostrar otros datos
      setTimeout(()=>{ this.getPlantas() }, 500);
  }
    
  //carga de imagen de planta, esto convendria sacarlo a otro componente no es parte del plano  
  onFileChange(event) {
    var reader = new FileReader();
      
    reader.onload = e => this.plantaSeleccionada.rutaImagen = reader.result;
      
    if (event.target.files && event.target.files[0]) {
        reader.readAsDataURL(event.target.files[0]);
    }
  }  
    
  getPlantas() {
    this.service.getAll()
      .subscribe(
          (data) => { 
              this.plantas = data
              console.log(this.plantas);
          }
      );
  }
  createPlanta() {
    this.service.create(this.plantaSeleccionada)
      .subscribe(
          (data) => { 
            this.plantaSeleccionada = data; 
            //actualizar listado  
            this.getPlantas(); 
          }
      ); 
      this.modalService.close("popup-planta");
  }
  updatePlanta() {
    this.service.update(this.plantaSeleccionada)
      .subscribe(
          (data) => { 
            this.plantaSeleccionada = data;
            //actualizar listado  
            this.getPlantas(); 
          }
      );
    this.modalService.close("popup-planta");
  }
  deletePlanta() {
    this.service.deleteOne(this.plantaSeleccionada.id)
      .subscribe(
          (data) => { 
            this.plantaSeleccionada = new Planta();
            //actualizar listado
            this.getPlantas();   
          }
      );
    //cerrar popup
    this.modalService.close("popup-eliminar-planta");
  }
    
  onSubmitPlanta() {
    if(this.esAlta) {
      this.createPlanta();    
    } else {
      this.plantaSeleccionada.idEmpresa = 1000;
      this.updatePlanta();
    }    
  }
    
  private esAlta: boolean;  
  onClickAlta() {
      this.esAlta = true;
      this.plantaSeleccionada = new Planta();
      this.modalService.open("popup-planta");
  }
  onClickModif(planta: Planta) {
      this.esAlta = false;
      this.plantaSeleccionada = Object.assign({}, planta);
      this.modalService.open("popup-planta");
  }
  onClickBaja(planta: Planta) {
      this.plantaSeleccionada = planta;
      this.modalService.open("popup-eliminar-planta");
  }
    
  onCancelar(id: string) {
    this.modalService.close(id);
  }  
}
