export class ComportamientoHora{
    id: number;
    horaInicio: string;
    horaFin: string;
    periodo: string;
    contactorSalida: boolean;
    habilitado: boolean;
    idSensor: number;
    sensor: string;
    puntoSensado: string;
    nroContactorSalida: number;

    constructor() {
        this.habilitado =
        this.contactorSalida = false;
    }
}

