import { trigger, style, animate, transition } from '@angular/animations';
import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResultadosService } from '../../services/resultados.service';

interface Card {
  suit: string;
  value: number;
}

@Component({
  selector: 'app-higher-lower',
  standalone: true,
  imports: [NgIf, CommonModule],
  templateUrl: './higher-lower.component.html',
  styleUrls: ['./higher-lower.component.css'],
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
export class HigherLowerComponent implements OnInit {
  suits = ['oro', 'espada', 'copa', 'basto'];
  deck: Card[] = [];
  currentCard: Card | null = null;
  nextCard: Card | null = null;
  score: number = 0;
  status: string = "Starting";
  gameOver:boolean = false;
  higherLowerButtons:boolean =false;
  isCardFlipped: boolean = true;

  constructor(private router: Router, private resultadosService:ResultadosService) { }

  ngOnInit(): void {
    this.initializeDeck();
    this.shuffleDeck();
    this.drawInitialCards();
  }

  startGame(): void{
    this.higherLowerButtons=true;
    this.isCardFlipped = false;
    this.status="Playing"
  }

  initializeDeck(): void {  //crea el mazo de cartas. recorro los 4 palos(suits)
    this.deck = [];
    for (const suit of this.suits) {
      for (let value = 1; value <= 12; value++) {
        this.deck.push({ suit, value });
      } //la estructura final tiene que ser:   { suit: 'oro', value: 3 }, { suit: 'basto', value: 10 }, y asi
    }
  }

  shuffleDeck(): void { //mezcla las cartas
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  drawInitialCards(): void {
    this.currentCard = this.deck.pop() || null; //devuelve la última carta del mazo y la asigna a currentCard
    this.nextCard = this.deck.pop() || null;
  }

  guessHigher(): void {
    if (!this.gameOver && this.nextCard) {
      if (this.nextCard.value > (this.currentCard?.value || 0)) { 
        this.score++;
      } else {
        this.score;
      }
      this.advanceGame();
    }
  }

  guessLower(): void {
    if (!this.gameOver && this.nextCard) {
      if (this.nextCard.value < (this.currentCard?.value || 0)) {
        this.score++;
      } else {
        this.score;
      }
      this.advanceGame();
    }
  }

  advanceGame(): void { //voy avanzando el juego con next card, y si no quedan mas cartas, lo termino
    this.currentCard = this.nextCard;
    this.nextCard = this.deck.pop() || null;
    this.isCardFlipped = false; //
    if (!this.nextCard) {
      this.gameOver = true;
      this.finalizarJuego();
    }
  }

  restartGame(): void {
    this.initializeDeck();
    this.shuffleDeck();
    this.drawInitialCards();
    this.score = 0;
    this.gameOver = false;
    this.isCardFlipped = true;
    this.higherLowerButtons=false;
    this.status = "Starting"; 
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }

  finalizarJuego() {
    
    if(this.score > 0 )
    {
      this.resultadosService.guardarResultado('Mayor Menor', this.score)
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


