import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthErrorCodes } from 'firebase/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  user: User = new User("","");
  errorEmail: number = -1; 
  errorMessage: string = '';


  constructor(private authService : AuthService, private router: Router,private firestore : Firestore) {}

  register() {

    let col = collection(this.firestore, 'registros');

    this.authService.crearUsuario(this.user.email, this.user.password).then((res) => {
      if (res.user.email !== null) {
        this.user.email = res.user.email;
        this.router.navigate(['/home']);
        this.errorEmail = -1;
        addDoc(col, { "date": new Date(), "usuario": this.user.email});
        this.authService.guardarUsuario(this.user.email);
      }

    }).catch((e) => {
      console.log(e);
      if (e.code === AuthErrorCodes.EMAIL_EXISTS) {
        this.errorMessage = 'This email is already registered. Please use a different email.';
      } else {
        this.errorMessage = 'An error occurred during registration. Please try again.';
      }
      this.errorEmail = 1;
    });
  }


}
