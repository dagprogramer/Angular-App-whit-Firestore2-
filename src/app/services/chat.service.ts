import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Mensaje } from '../interfaces/mensaje.interface';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public chats:Mensaje[]=[];
  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public usuario:any={};

  constructor(private angularFirestore:AngularFirestore,
              public afAuth: AngularFireAuth) { 
                this.afAuth.authState.subscribe(user=>this.obtenerDatosUsuario(user));
              }
              
  obtenerDatosUsuario(user: firebase.User): void {
    this.usuario.nombre=user.displayName;
    this.usuario.uid=user.uid;
  }

  cargarMensajes(){
    this.itemsCollection = this.angularFirestore.collection<Mensaje>('chats',ref=>ref.orderBy('fecha','desc').limit(5));
    return this.itemsCollection.valueChanges().pipe(
      map((mensajes:any[])=>this.obtenerMensajes(mensajes))
    )
  }
  obtenerMensajes(mensajes: any[]): any {
    this.chats=[];
    for(let mensaje of mensajes){
      this.chats.unshift(mensaje);
    }
    return this.chats;
  }
  
  agregarMensaje(texto:string){
     let mensaje:Mensaje={
       nombre:this.usuario.nombre,
       mensaje:texto,
       fecha:new Date().getTime(),
       uid:this.usuario.uid
     }
     return this.itemsCollection.add(mensaje);
  }

  login(proovedor:string) {
    if(proovedor === 'google'){
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }else{
      alert('la autenticacion no esta desarrollada');
    }
  }
  logout() {
    this.usuario={};
    this.afAuth.auth.signOut();
  }

}
