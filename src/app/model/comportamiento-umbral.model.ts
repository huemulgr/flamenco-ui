export class ComportamientoUmbral{
    id: number;
    habilitado: boolean;
    contactorEntrada: boolean;
    contactorSalida: boolean;
    condicionY: boolean;
    habilitarContEntrada: boolean;
    umbralSup: number;
    umbralInf: number;
    sensor: string;
    puntoSensado: string;
    idSensor: number;
    nroContactorEntrada: number;
    nroContactorSalida: number;

    constructor() {
        this.habilitado = false;
        this.contactorEntrada = false;
        this.contactorSalida = false;
        this.condicionY = false;
        this.habilitarContEntrada = false;
    }
}

