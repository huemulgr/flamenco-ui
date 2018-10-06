import { Injectable } from '@angular/core';
import { AbstractRestService } from "src/app/services/abstract-rest.service";
import { Sensor } from "src/app/model/sensor.model";
import { HttpClient }from '@angular/common/http';
import { SharedService } from 'src/app/services/shared.service';

@Injectable({
  providedIn: 'root'
})

export class SensorService extends AbstractRestService<Sensor> {  
    
    constructor(http: HttpClient, protected sharedService: SharedService) {
        super(http, "sensor/", sharedService);
    }
}