import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// Exportamos la interface del archivo
export interface Item {nombre: string; url: string;}

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styleUrls: ['./fotos.component.css']
})
export class FotosComponent implements OnInit {

  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  constructor( private _afs: AngularFirestore) {
    this.itemsCollection = _afs.collection<Item>('img');
    this.items = this.itemsCollection.valueChanges();
   }

  ngOnInit() {
  }

}
