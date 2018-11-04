import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule} from "@angular/common/http";
import {Location, LocationStrategy, HashLocationStrategy} from '@angular/common';

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

import { ActivacionManualService } from './services/activacion-manual.service';
import { AlarmaService } from './services/alarma.service';
import { ComportamientoUmbralService } from './services/comportamiento-umbral.service';
import { ComportamientoHoraService } from './services/comportamiento-hora.service';
import { EmpresaService } from './services/empresa.service';
import { EstadoActualService } from './services/estado-actual.service';
import { PerfilService } from './services/perfil.service';
import { PlantaService } from './services/planta.service';
import { PuntoDeSensadoService } from './services/punto-de-sensado.service';
import { SensorService } from './services/sensor.service';
import { UsuarioService } from './services/usuario.service';

import { ModalService } from './services/modal.service';
import { SharedService } from './services/shared.service';
import { ModalComponent } from './modal/modal.component';
import { AbmAlarmaComponent } from './abm-alarma/abm-alarma.component';
import { AbmComportamientosComponent } from './abm-comportamientos/abm-comportamientos.component';
import { AbmPlantaComponent } from './abm-planta/abm-planta.component';
import { AbmPuntoSensadoComponent } from './abm-punto-sensado/abm-punto-sensado.component';
import { IgnoreSanitizePipe } from './ignore-sanitize.pipe';
import { AbmUsuariosComponent } from './abm-usuarios/abm-usuarios.component';
import { PopupGeneralComponent } from './popup-general/popup-general.component';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './auth-guard/auth.guard';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'admin-usuarios', component: VistaAdminUsuariosComponent, canActivate: [AuthGuard]  },
  { path: 'config-general', component: VistaConfiguracionGralComponent, canActivate: [AuthGuard]  },
  { path: 'config-MAS', component: VistaConfiguracionMASComponent, canActivate: [AuthGuard]  },
  { path: 'config-MAS-alarmas', component: AbmAlarmaComponent, canActivate: [AuthGuard]  },
  { path: 'estadisticas', component: VistaEstadisticasComponent, canActivate: [AuthGuard]  },
  { path: 'estado-grilla', component: VistaGrillaComponent, canActivate: [AuthGuard]  },
  { path: 'estado-plano', component: VistaPlanoComponent, canActivate: [AuthGuard]  },
  { path: 'login', component: LoginComponent }
];
RouterModule.forRoot(appRoutes, {useHash: true})

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
    IgnoreSanitizePipe, AbmUsuariosComponent, PopupGeneralComponent, LoginComponent, HomeComponent 
  ],

  bootstrap: [AppComponent],

  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    ModalService, 
    AuthGuard,
    ActivacionManualService,  
    AlarmaService, 
    ComportamientoHoraService,
    ComportamientoUmbralService, 
    EmpresaService,
    EstadoActualService, 
    PerfilService,
    PlantaService,
    PuntoDeSensadoService,
    SensorService,
    SharedService,
    UsuarioService
  ]
})
export class AppModule { }
