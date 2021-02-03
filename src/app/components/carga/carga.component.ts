import { Component, OnInit } from '@angular/core';
// Interface
import { FileItem } from '../../models/file-item';
// Servicio
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.css']
})

export class CargaComponent implements OnInit {

  estaSobreElemento = false;
  archivos: FileItem[] = [];

  constructor( public _cargaImagenes: FirebaseService) { }

  ngOnInit() {
  }

  // Cargar imagenes a subir el servidor
  cargarImagenes(){
    this._cargaImagenes.cargarImagenesFirebase( this.archivos );
  }

  // Limpar imagenes cargadas
  limpiarImagenes(){
    this.archivos = [];
  }


}
