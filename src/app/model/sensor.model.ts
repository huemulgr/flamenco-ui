export class Sensor{
  planta: string;
  id: number;
  nombre: string;
  nombreAbreviado: string;
  descripcion: string;
  ordenImpresion: number;
  ordenGrilla: number;
  minutosMuestreo: number;
  descripcionUbicacion: string;
  deltaMuestreo: number;
  habilitado: boolean;
  tipo: string;
  mac: string;
  macDelCoordinador: string;
  tieneAlarma: boolean;
  tieneCompHora: boolean;
  tieneCompUmbral: boolean;
  asignadoPerfil: boolean;
  idPuntoSensado: any;
  idTipoSensor: number;
    
  constructor() {
    this.habilitado = false;
    this.idTipoSensor = 1;      
  }  
}