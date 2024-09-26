import { trigger, style, animate, transition } from '@angular/animations';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-hangman',
  standalone: true,
  imports: [NgIf,CommonModule,NgFor],  
  templateUrl: './hangman.component.html',
  styleUrl: './hangman.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class HangmanComponent implements OnInit {  

  words: string[] = ['funcion', 'variable', 'componente', 'servicio', 'programacion'];
  selectedWord: string = '';
  displayWord: string[] = [];
  attempts: number = 6;
  guessedLetters: string[] = [];
  wrongLetters: string[] = [];
  status: string = 'Playing';
  letters: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  hangmanImages: string[] = [
    'assets/hangman/hangman_01.png',
    'assets/hangman/hangman_02.png',
    'assets/hangman/hangman_03.png',
    'assets/hangman/hangman_04.png',
    'assets/hangman/hangman_05.png',
    'assets/hangman/hangman_06.png',
    'assets/hangman/hangman_07.png'
  ];

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.startGame();
  }

  startGame(): void {
    this.selectedWord = this.words[Math.floor(Math.random() * this.words.length)];
    this.displayWord = Array(this.selectedWord.length).fill('_');
    this.attempts = 6;
    this.guessedLetters = [];
    this.wrongLetters = [];
    this.status = 'Playing';
  }

  guessLetter(letter: string): void {
    if (this.status !== 'Playing' || this.guessedLetters.includes(letter)) {
      return;
    }
    this.guessedLetters.push(letter);
    if (this.selectedWord.includes(letter.toLowerCase())) {
      for (let i = 0; i < this.selectedWord.length; i++) {
        if (this.selectedWord[i] === letter.toLowerCase()) {
          this.displayWord[i] = letter.toLowerCase();
        }
      }
      if (!this.displayWord.includes('_')) {
        this.status = '¡Ganaste!';
      }
    } else {
      this.wrongLetters.push(letter)
      this.attempts--;
      if (this.attempts === 0) {
        this.status = 'Perdiste. ¡Inténtalo otra vez!';
      }
    }
  }
  goToHome():void{
    this.router.navigate(['/home']);
  }

  get hangmanImage(): string {
    return this.hangmanImages[6 - this.attempts];
  }
  
}

