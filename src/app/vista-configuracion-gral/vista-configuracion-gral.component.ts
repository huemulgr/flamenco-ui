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
  configGral: ConfigGeneral = new ConfigGeneral();
  configImpresion: ConfigImpresion = new ConfigImpresion();
  configGeneralDisabled;
  configImpresionDisabled;
  ocultarModal;
  empresas: Empresa[];
  empresa: Empresa = new Empresa();
  verAbmPlantas: boolean;
  
  constructor(private service: EmpresaService, private modalService: ModalService) { }

  ngOnInit() {
    this.ocultarModal = true;
    this.configGeneralDisabled = true;
    this.configImpresionDisabled = true;
    this.getEmpresa();
    this.verAbmPlantas = false;
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
  updateEmpresa() {
    this.service.update(this.empresa)
      .subscribe(
          (data: Empresa) => { 
              this.empresa = data;
              console.log(this.empresa + " actualizado");
          }
      );
  }

  onSubmitConfigGral() {
    if(this.formGeneral.valid) {
      console.log(JSON.stringify(this.configGral));

      //TODO: ver compatibilidad con campo Time de mysql por los segundos, segun el browser a veces no estan
      
      if(this.configGral.cambiaPass) {  
        this.empresa.passwordActual = this.configGral.passConfig;  
      }
      
      this.updateEmpresa();  
        
      //reset inputs
      this.configGral.cambiaPass = false;
      this.configGral.passConfig = this.configGral.passNueva = this.configGral.passNueva2 = "";
      
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
    
  onClickVerAbmPlantas() {
    this.verAbmPlantas = !this.verAbmPlantas;
  }  
  
  openModal(id: string) {
      this.modalService.open(id);
  }

  closeModal(id: string) {
      this.modalService.close(id);
  }
}