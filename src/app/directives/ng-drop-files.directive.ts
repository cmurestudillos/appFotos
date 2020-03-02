import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/file-item';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

@Input() archivos: FileItem[]=[];
@Output() mouseSobre: EventEmitter<boolean> =  new EventEmitter();

  constructor() { }

  // Mouse encima de la caja/cursor
  @HostListener('dragover', ['$event'])
  public onDragEnter(event: any){
    this.mouseSobre.emit(true);
    this._prevenir(event);
  }

  // Mouse fuera de la caja/cursor
  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any){
    this.mouseSobre.emit(false);
  }

  // Mouse fuera de la caja/cursor
  @HostListener('drop', ['$event'])
  public onDrop(event: any){

    // Aqui tenemos ya la informacion del archivo
    const transferencia = this._getTransferencia(event);
    if(!transferencia){
      return;
    }

    this._extraerArchivos(transferencia.files);
    this._prevenir(event);
    this.mouseSobre.emit(false);

  }

  // Comprobar compatibilidad de los navegadores
  private _getTransferencia(event:any){
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

    // Trabajar con los archivos cargados
    private _extraerArchivos(archivosLista:FileList){
      // console.log(archivosLista);
      for (const propiedad in Object.getOwnPropertyNames(archivosLista)) {
        // console.log(archivosLista);
        const archivoTemporal = archivosLista[propiedad];

        if(this._archivoYaCargado(archivoTemporal)){
          const nuevoArchivo = new FileItem(archivoTemporal);
          this.archivos.push(nuevoArchivo);
        }
      }
      console.log(this.archivos);
    }

  // Validaciones
  //---------------------------------------------------------

  private  _archivoYaCargado(fichero: File): boolean{
    if( !this._archivoDropeado( fichero.name ) &&  this._esImagen(fichero.type)){
      return true;
    }else{
      return false;
    }
  }



  // Evitar que el Chrome abra la imagen al soltarla en la caja
  private _prevenir(event){
    event.preventDefault();
    event.stopPropagation();
  }

  // Evitar que archivo arrastrado no exista en el array de ficheros cargados
  private _archivoDropeado(nombreArchivo:string): boolean {
    for(const archivo of this.archivos){
      if(archivo.nombreArchivo === nombreArchivo){
        console.log('El archivo ' + nombreArchivo + ' ya existe.');
        return true;
      }
    }
    return false;
  }

  // Solo se van a aceptar archivos de imagenes
  private _esImagen(tipoArchivo:string): boolean {
      if(tipoArchivo === '' || tipoArchivo === undefined){
        return false;
      }else{
        if(tipoArchivo.startsWith('image')){
          return true;
        }
      }
  }

}
