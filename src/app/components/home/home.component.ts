import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { User } from 'firebase/auth';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
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

export class HomeComponent implements OnInit {
  /*userEmail: string | null = null;
  games = [
    { title: 'Hangman', text: 'Try to guess the word before you run out of attempts!', img: 'assets/hangman.png', path: '/hangman' },
    { title: 'Higher Lower', text: 'Description of Game 2', img: 'assets/carta.jpg', path: '/higherLower' },
    { title: 'Trivia', text: 'Description of Game 3', img: 'assets/carta.jpg', path: '/trivia' },
    { title: 'Word Search', text: 'Description of Game 4', img: 'assets/carta.jpg', path: '/word-search' },
    // Agregar más juegos según sea necesario
  ];*/

  userEmail: string | null = null;
  games = [
    { title: 'Ahorcado', text: 'Pon a prueba tu vocabulario y tus habilidades para resolver acertijos. En este emocionante juego, tu objetivo es adivinar la palabra oculta letra por letra antes de que el ahorcado quede completamente dibujado.', img: 'assets/hangman.png', path: '/hangman' },
    { title: 'Mayor Menor', text: 'Pon a prueba tu intuición mientras intentas adivinar si la siguiente carta será mayor o menor que la carta actual. ¡Elige correctamente tantas veces como puedas hasta que se acabe el mazo!', img: 'assets/juegoCarta.jpeg', path: '/higherLower' },
    { title: 'Aventura Global', text: '¡El desafío definitivo para los amantes de la geografía! En este emocionante juego de trivia, verás la imagen de la bandera de un país y tu tarea será adivinar a qué país pertenece', img: 'assets/trivia.png', path: '/trivia' },
    { title: 'Letras Enredadas', text: '¡Descubre la diversión de Letras Enredadas! Ponte a prueba y encuentra todas las palabras ocultas en una cuadrícula de letras. ¡Perfecto para aumentar tu vocabulario y ejercitar tu cerebro!', img: 'assets/wordsearch.jpg', path: '/word-search' },

  ];

  userName : string = ''

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.authService.currentUser.subscribe((user: User | null) => {
      this.userEmail = user?.email || null;
    });
  }


  logout(): void {
    this.authService.signOut().then(() => {
      this.router.navigate(['/log-in']);
    });
  }

  goToLogin(): void {
    this.router.navigate(['/log-in']);
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  playGame(path: string): void {
    this.router.navigate([path]);
  }

  getUserNameFromEmail(){
    if (!this.userEmail) {
      return null;
    }
    else
    {
      const atIndex = this.userEmail.indexOf('@'); 
      if (atIndex !== -1) {
        this.userName = this.userEmail.substring(0, atIndex); 
        return this.userName
      } else {
        return null; 
      }
    }
  }
}
 
