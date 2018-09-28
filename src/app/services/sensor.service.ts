import { Injectable } from '@angular/core';
import { AbstractRestService } from "src/app/services/abstract-rest.service";
import { Sensor } from "src/app/model/sensor.model";
import { HttpClient }from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class SensorService extends AbstractRestService<Sensor> {  
    
    constructor(http: HttpClient) {
        super(http, "sensor/");
    }
}