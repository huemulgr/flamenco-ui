export class ComportamientoUmbral{
    id: number;
    habilitado: boolean;
    umbralSup: number;
    umbralInf: number;
    contactorEntrada: boolean;
    contactorSalida: boolean;
    condicionY: boolean;
    habilitarContEntrada: boolean;
    sensor: string;
    puntoSensado: string;
    idSensor: number;
    nroContactorEntrada: number;
    nroContactorSalida: number;

    constructor() {
        this.habilitado = 
        this.contactorEntrada = 
        this.contactorSalida =
        this.condicionY = 
        this.habilitarContEntrada = false;
    }
}

