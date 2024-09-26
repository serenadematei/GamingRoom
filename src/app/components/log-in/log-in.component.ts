import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';
import { AuthErrorCodes } from 'firebase/auth';
import { User } from '../../models/user';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('800ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('800ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class LoginComponent {

  user = { email: '', password: '' };
  errorMessage: string = '';
  showRegisterLink: boolean = false;

  constructor(private authService: AuthService, private router: Router, private firestore : Firestore) {}

  login() {

    let col = collection(this.firestore, 'logsExitosos');
    this.authService.logIn(this.user.email, this.user.password)
      .then((res) => {
        addDoc(col, { "date": new Date(), "usuario": this.user.email});
        this.authService.guardarUsuario(this.user.email);
        console.log('Inicio de sesión exitoso:', res);
        this.router.navigate(['/home']);
      })
      .catch((e) => {
        if (e.code === AuthErrorCodes.INVALID_EMAIL || e.code === AuthErrorCodes.USER_DELETED) {
          this.errorMessage = 'La dirección de correo electrónico no es válida. Por favor, compruébela y vuelva a intentarlo.'
        } else {
          this.errorMessage = 'Nombre de usuario o contraseña incorrectos. Por favor, inténtelo de nuevo.';
        }
      });
  }

  enterAsGuest(){
    this.user.email = 'invitado@gmail.com';
    this.user.password = '123456'
  }

}
