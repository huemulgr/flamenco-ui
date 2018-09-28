import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import { BarraMenuComponent } from './barra-menu/barra-menu.component';
import { NavegacionComponent } from './navegacion/navegacion.component';
import { VistaAdminUsuariosComponent } from './vista-admin-usuarios/vista-admin-usuarios.component';
import { VistaConfiguracionGralComponent } from './vista-configuracion-gral/vista-configuracion-gral.component';
import { VistaConfiguracionMASComponent } from './vista-configuracion-mas/vista-configuracion-mas.component';
import { VistaEstadisticasComponent } from './vista-estadisticas/vista-estadisticas.component';
import { VistaGrillaComponent } from './vista-grilla/vista-grilla.component';
import { VistaPlanoComponent } from './vista-plano/vista-plano.component';

import { PlanoComponent } from './plano/plano.component';
import { PlanoModifComponent } from './plano-modif/plano-modif.component';
import { MasComponent } from './mas/mas.component';

import { EstadoActualService } from './services/estado-actual.service';
import { AlarmaService } from './services/alarma.service';
import { ComportamientoUmbralService } from './services/comportamiento-umbral.service';
import { ComportamientoHoraService } from './services/comportamiento-hora.service';
import { EmpresaService } from './services/empresa.service';
import { PlantaService } from './services/planta.service';
import { PuntoDeSensadoService } from './services/punto-de-sensado.service';
import { SensorService } from './services/sensor.service';
import { ModalService } from './services/modal.service';
import { ModalComponent } from './modal/modal.component';
import { AbmAlarmaComponent } from './abm-alarma/abm-alarma.component';
import { AbmComportamientosComponent } from './abm-comportamientos/abm-comportamientos.component';
import { AbmPlantaComponent } from './abm-planta/abm-planta.component';
import { AbmPuntoSensadoComponent } from './abm-punto-sensado/abm-punto-sensado.component';
import { IgnoreSanitizePipe } from './ignore-sanitize.pipe';


const appRoutes: Routes = [
  { path: 'admin-usuarios', component: VistaAdminUsuariosComponent },
  { path: 'config-general', component: VistaConfiguracionGralComponent },
  { path: 'config-MAS', component: VistaConfiguracionMASComponent },
  { path: 'config-MAS-alarmas', component: AbmAlarmaComponent },
  { path: 'estadisticas', component: VistaEstadisticasComponent },
  { path: 'estado-grilla', component: VistaGrillaComponent },
  { path: 'estado-plano', component: VistaPlanoComponent }
];

@NgModule({
  imports:      [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ), 
    BrowserModule, 
    ChartsModule,
    FormsModule, 
    HttpClientModule 
  ],

  declarations: [ 
    AppComponent, 
    NavegacionComponent, 
    BarraMenuComponent, 
    VistaGrillaComponent, 
    VistaPlanoComponent, 
    VistaConfiguracionMASComponent, 
    VistaEstadisticasComponent, 
    VistaAdminUsuariosComponent, 
    VistaConfiguracionGralComponent, 
    PlanoComponent, 
    PlanoModifComponent, 
    MasComponent, 
    ModalComponent, 
    AbmAlarmaComponent,
    AbmComportamientosComponent,
    AbmPlantaComponent, 
    AbmPuntoSensadoComponent, 
    IgnoreSanitizePipe 
  ],

  bootstrap: [AppComponent],

  providers: [
    ModalService, 
    AlarmaService, 
    ComportamientoHoraService,
    ComportamientoUmbralService, 
    EmpresaService,
    EstadoActualService, 
    PlantaService,
    PuntoDeSensadoService,
    SensorService
  ]
})
export class AppModule { }
