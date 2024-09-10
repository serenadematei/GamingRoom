import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';
import { AuthErrorCodes } from 'firebase/auth';

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

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.logIn(this.user.email, this.user.password)
      .then((res) => {
        console.log('Inicio de sesión exitoso:', res);
        this.router.navigate(['/home']);
      })
      .catch((e) => {
        if (e.code === AuthErrorCodes.INVALID_EMAIL || e.code === AuthErrorCodes.USER_DELETED) {
          this.errorMessage = 'The email address is invalid. Please check and try again.'
        } else {
          this.errorMessage = 'Incorrect username or password. Please try again.';
        }
      });
  }

  enterAsGuest(){
    this.user.email = 'guest@gmail.com';
    this.user.password = '123456'
  }

}
