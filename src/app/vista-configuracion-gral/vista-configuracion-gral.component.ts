import { Component, OnInit, ViewChild } from '@angular/core';
import { EmpresaService, RespuestaValidarClave } from 'src/app/services/empresa.service';
import { ModalService } from 'src/app/services/modal.service';
import { Empresa } from 'src/app/model/empresa.model';
import { Location } from '@angular/common';

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

class EspacioLibreMensaje {
  public mensaje: string;        
}  

@Component({
  selector: 'app-vista-configuracion-gral',
  templateUrl: './vista-configuracion-gral.component.html',
  styleUrls: ['./vista-configuracion-gral.component.css']
})


export class VistaConfiguracionGralComponent implements OnInit {

  @ViewChild("formGeneral") formGeneral: any;
  cambiaPass: boolean;
  passConfig: string = "";
  passActual: string;
  passNueva2: string;
  configGeneralDisabled;
  configImpresionDisabled;
  ocultarModal;
  empresas: Empresa[];
  empresa: Empresa = new Empresa();
  
  constructor(private service: EmpresaService, 
    private modalService: ModalService, private location: Location) { }

  ngOnInit() {      
    this.getEmpresa();
    setTimeout(()=>{ this.openModal("popup-clave") }, 100);
  }
  
  //hardcodeo id de empresa, suponiendo que vamos a tener uno solo con id = 1000 por comodidad, cambiar en caso contrario  
  getEmpresa() {
    this.service.getOne(1000)
      .subscribe(
          (data: Empresa) => { 
              this.empresa = data;
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
  
    
    
  msjEspacioLibre = "";  
  clickComprobarEspacio() {
    this.service.obtenerEspacioLibre(this.empresa.periodo)
        .subscribe((data: EspacioLibreMensaje) => {
            this.msjEspacioLibre = "Con el periodo de impresión indicado se tendría una autonomía aproximada de "
                + data.mensaje;
        })  
  }  
  
  valuechange(event) {
    this.msjEspacioLibre = "";    
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
  
  volver() {
    this.location.back();          
  }   
  openModal(id: string) {
      this.modalService.open(id);
  }
  closeModal(id: string) {
      this.modalService.close(id);
  }
}