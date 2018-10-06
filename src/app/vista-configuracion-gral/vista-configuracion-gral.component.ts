import { Component, OnInit, ViewChild } from '@angular/core';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ModalService } from 'src/app/services/modal.service';
import { Empresa } from 'src/app/model/empresa.model';

//modelo
class ConfigGeneral {
  public razonSocial: string = "";
  public cambiaPass: boolean = false;
  public passConfig: string = "";
  public passNueva: string = "";
  public passNueva2: string = "";
}

class ConfigImpresion {
  public encabezado: string = "";
  public horaImpresionIni: string = "";
  public periodoImpresion: string = "";
}


@Component({
  selector: 'app-vista-configuracion-gral',
  templateUrl: './vista-configuracion-gral.component.html',
  styleUrls: ['./vista-configuracion-gral.component.css']
})


export class VistaConfiguracionGralComponent implements OnInit {

  @ViewChild("formGeneral") formGeneral: any;
  @ViewChild("formModal") formModal: any;
  cambiaPass: boolean;
  passConfig: string;
  passActual: string;
  passNueva2: string;
  configGeneralDisabled;
  configImpresionDisabled;
  ocultarModal;
  empresas: Empresa[];
  empresa: Empresa = new Empresa();
  
  constructor(private service: EmpresaService, private modalService: ModalService) { }

  ngOnInit() {
    this.ocultarModal = true;
    this.configGeneralDisabled = true;
    this.configImpresionDisabled = true;
    this.getEmpresa();
  }
  
  //hardcodeo id de empresa, suponiendo que vamos a tener uno solo con id = 1 por comodidad, cambiar en caso contrario  
  getEmpresa() {
    this.service.getOne(1)
      .subscribe(
          (data: Empresa) => { 
              this.empresa = data;
              console.log(this.empresa);
          }
      );
  }
  createEmpresa() {
      this.service.create(this.empresa)
      .subscribe(
          (data: Empresa) => { 
              this.getEmpresa();
          }
      );
  }
  updateEmpresa() {
    this.service.update(this.empresa)
      .subscribe(
          (data: Empresa) => { 
              this.getEmpresa();
          }
      );
  }

  onSubmitConfigGral() {
    if(this.formGeneral.valid) {
      if(this.cambiaPass) {  
        this.empresa.passwordActual = this.passActual;  
      }
      
      if(!this.empresa.id) {
        //carga inicial
        this.createEmpresa();
      } else {
        //las proximas veces siempre se actualiza la misma
        this.updateEmpresa();
      }  
        
      //reset inputs
      this.cambiaPass = false;
      this.passActual = ""; 
      this.passNueva2 = "";
      
      this.configGeneralDisabled = true;
    }
  }


  onSubmitModalPassword() {
    if(this.formModal.valid) {
      console.log(this.formModal.value);
      this.ocultarModal = true;
      this.configGeneralDisabled = false;
    }
  }  
  
  openModal(id: string) {
      this.modalService.open(id);
  }

  closeModal(id: string) {
      this.modalService.close(id);
  }
}