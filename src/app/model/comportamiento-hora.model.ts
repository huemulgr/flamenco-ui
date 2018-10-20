export class ComportamientoHora{
    id: number;
    habilitado: boolean;
    contactorEntrada: boolean;
    contactorSalida: boolean;
    condicionY: boolean;
    habilitarContEntrada: boolean;
    horaInicio: string;
    horaFin: string;
    periodo: string;
    idSensor: number;
    sensor: string;
    puntoSensado: string;
    nroContactorSalida: number;
    nroContactorEntrada: number;

    constructor() {
        this.habilitado = false;
        this.contactorEntrada = false;
        this.contactorSalida = false;
        this.condicionY = false;
        this.habilitarContEntrada = false;
    }
}

