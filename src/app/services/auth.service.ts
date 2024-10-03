
import { Injectable, inject, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut, user, User,onAuthStateChanged} from '@angular/fire/auth';
import { Observable, BehaviorSubject , from, map, of, tap } from 'rxjs';
import {Firestore, collection,addDoc, collectionData} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';




@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private auth: Auth) {
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();

    onAuthStateChanged(this.auth, (user) => {
      this.currentUserSubject.next(user);
    });
  }

  crearUsuario(email: string, clave: string): Promise<any> {
    return createUserWithEmailAndPassword(this.auth, email, clave);
  }

  guardarUsuario(email: string) {
    localStorage.setItem("usuarioActual", email);
  }

  getCurrentUser(): Promise<User | null> {
    return new Promise((resolve) => {
      resolve(this.currentUserSubject.value);
    });
  }

  logIn(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signOut(): Promise<void> {
    return signOut(this.auth).then(() => {
      this.currentUserSubject.next(null);
    });
  }
}