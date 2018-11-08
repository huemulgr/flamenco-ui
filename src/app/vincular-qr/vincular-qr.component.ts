import { Component, OnInit } from '@angular/core';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ModalService } from 'src/app/services/modal.service';
import { Empresa } from 'src/app/model/empresa.model';

@Component({
  selector: 'app-vincular-qr',
  templateUrl: './vincular-qr.component.html',
  styleUrls: ['./vincular-qr.component.css']
})
export class VincularQrComponent implements OnInit {
  empresa: Empresa = new Empresa();

  constructor(private service: EmpresaService) { }

  ngOnInit() {    
    this.getEmpresa();
  }

  //hardcodeo id de empresa, suponiendo que vamos a tener uno solo con id = 1000 por comodidad, cambiar en caso contrario  
  getEmpresa() {
    this.service.getOne(1000)
      .subscribe(
          (data: Empresa) => { 
              this.empresa = data;
              console.log(this.empresa);
          }
      );
  }

}
