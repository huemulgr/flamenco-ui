export class Planta {
   id: number;
   nombre: string;
   habilitado: boolean;
   rutaImagen: string;
   razonSocial: string;
   idEmpresa: number;
   
   constructor() {
     this.idEmpresa = 1;
     this.rutaImagen = "";
     this.habilitado = false;
   } 
}
