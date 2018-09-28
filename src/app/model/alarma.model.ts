export class Alarma{
    id: number;
    umbralSuperior: number;
    umbralInferior: number;
    nombre: string;
    idSensor: number;
    sensor: string;
    puntoSensado: string;
    habilitado: boolean;
    habilitadoAvisoCelular: boolean;
    
    constructor (){
        this.habilitado = false;
        this.habilitadoAvisoCelular = false;
    } 
}