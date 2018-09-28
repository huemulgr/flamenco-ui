import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

//esto evitaria el mensaje en consola de que sanitiza los url de las imagenes, pero como
//no produce una falla de momento no lo uso

@Pipe({
    name: 'sanitaryPipe'
})
export class IgnoreSanitizePipe implements PipeTransform {

   constructor(private sanitizer: DomSanitizer){}

   transform(input: string) : any {
       return this.sanitizer.bypassSecurityTrustUrl(input);
   }

}
