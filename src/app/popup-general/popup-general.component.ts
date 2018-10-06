import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { SharedService } from 'src/app/services/shared.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-popup-general',
  templateUrl: './popup-general.component.html',
  styleUrls: ['./popup-general.component.css']
})
export class PopupGeneralComponent implements OnInit {
  public msj: string;
  msjSrc: Subject<string>;
    
  constructor(private modalService: ModalService, private sharedService: SharedService) {
    this.msjSrc = this.sharedService.msjSource;    
    this.msjSrc.subscribe(value => {
      this.msj = value;
      this.abrir();  
    });  
  }

  ngOnInit() {
  }    
    
  abrir() {
    this.modalService.open('popup-general');    
  }
  cerrar() {
    this.modalService.close('popup-general');    
  }  
    
    
}
