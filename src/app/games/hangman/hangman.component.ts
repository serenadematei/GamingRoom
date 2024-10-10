import { trigger, style, animate, transition } from '@angular/animations';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResultadosService } from '../../services/resultados.service';


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

  timeElapsed: number = 0;
  timerInterval: any;
  totalTimeTaken: number = 0;
  score: number = 0;

  constructor(private router:Router, private resultadosService:ResultadosService) { }

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

    this.timeElapsed = 0;
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    this.startTimer();
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.timeElapsed++;
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timerInterval);
    this.totalTimeTaken = this.timeElapsed;
  }

    calculateScore() {
      if (this.totalTimeTaken <= 20) {
        this.score = 100;
      } else if (this.totalTimeTaken <= 40) {
        this.score = 75;
      } else if (this.totalTimeTaken <= 60) {
        this.score = 50;
      } else if (this.totalTimeTaken <= 80) {
        this.score = 20;
      } else {
        this.score = 10;
      }
      this.finalizarJuego();
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
        this.stopTimer();
        this.status = '¡Ganaste!';
        this.calculateScore();
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

  finalizarJuego() {
    // Guardar el resultado del juego
    if(this.score > 0 )
    {
      this.resultadosService.guardarResultado('Ahorcado', this.score)
      .then(() => {
        console.log('Puntaje guardado con éxito');
      })
      .catch(error => {
        console.log('Error al guardar el resultado: ', error);
      });
    }
    else
    {
      console.log("Puntaje 0, no lo guardo");
    }
    
  }
  
}

