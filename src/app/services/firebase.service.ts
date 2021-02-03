import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFirestore } from '@angular/fire/firestore';

// Interface
import { FileItem } from '../models/file-item';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  private CARPETA_IMAGENES = 'img';

  constructor( private db: AngularFirestore) { }

  // Peticion para cargar las imagenes
  cargarImagenesFirebase( imagenes: FileItem[]){
    // referencia al storage de firebase
    const storageRef = firebase.storage().ref();
    for (const item of imagenes) {
      item.estaSubiendo = true;
      if (item.progreso >= 100){
        continue;
      }

      const uploadTask: firebase.storage.UploadTask = storageRef.child(`${this.CARPETA_IMAGENES}/${item.nombreArchivo}`)
                                                                .put( item.archivo );
      // ejecutar la subida del archivo
      uploadTask.on( 'state_changed',
        (snapshot: firebase.storage.UploadTaskSnapshot) => {
          item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        },
        (error) => {
          console.log('Error al subir el archivo.');
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log('Archivo disponible en: ', downloadURL);
            item.url = downloadURL;
            item.estaSubiendo = false;
            this.guardarImagen({
              nombre: item.nombreArchivo,
              url: item.url
            });
          });
        });
    }
  }

  // Peticion para guardar las imagenes subidas
  private guardarImagen(imagen:{ nombre: string, url: string}){
    this.db.collection(`/${this.CARPETA_IMAGENES}`)
            .add( imagen);
  }
}
