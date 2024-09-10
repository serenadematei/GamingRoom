import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {provideAuth,getAuth} from '@angular/fire/auth';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideAnimations(), 
   ([
    provideFirebaseApp(()=>initializeApp(firebaseConfig)),
    provideFirestore(()=>getFirestore()),
    provideAuth(() => getAuth())
  ])]
}; 

const firebaseConfig = {
  apiKey: "AIzaSyD1FT0i72AQTaiNtV_8GFmNLD8WQCJaOBM",
  authDomain: "gamingroom-70020.firebaseapp.com",
  projectId: "gamingroom-70020",
  storageBucket: "gamingroom-70020.appspot.com",
  messagingSenderId: "583817949201",
  appId: "1:583817949201:web:3710db5ed9da1a5669c1b0"
};

