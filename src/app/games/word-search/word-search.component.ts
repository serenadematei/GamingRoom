import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-word-search',
  standalone: true,
  imports: [FormsModule, NgIf, CommonModule, NgFor],
  templateUrl: './word-search.component.html',
  styleUrl: './word-search.component.css'
})
export class WordSearchComponent implements OnInit{
  categories: { name: string, words: string[] }[] = [
    { name: 'Animales', words: ['PERRO', 'GATO', 'ELEFANTE', 'TIGRE', 'LEON'] },
    { name: 'Programación', words: ['PARAMETRO', 'COMPONENTE', 'SERVICIO', 'MODULO', 'VARIABLE'] },
    { name: 'Comidas', words: ['PIZZA', 'TORTA', 'PASTA', 'CARNE', 'SUSHI'] },
    { name: 'Profesiones', words: ['DOCTOR', 'INGENIERO', 'MAESTRO', 'DENTISTA', 'ABOGADO'] }
  ];

  positiveMessages: string[] = [
    '¡Fantástico!',
    '¡Vamos!',
    '¡Correcto!',
    '¡Increíble!',
    '¡Genial!',
    '¡Perfecto!'
  ];
  negativeMessages: string[] = [
    '¡Oops! intenta de nuevo',
    'Incorrecto. Prueba otra vez',
    'No es correcto, pero no te rindas',
    'Hmm... esa no es la respuesta. ¡Sigue adelante!',
    '¡Oh no! Esa no es',
    'Sigue intentando, ¡lo conseguirás!'
  ];

  selectedCategory: { name: string, words: string[] } | null = null;
  grid: string[][] = [];
  foundWords: Set<string> = new Set();
  selectedWord: string = '';
  selectedCells: { row: number, col: number }[] = [];
  score: number = 0;
  gameOver: boolean = false;

  feedbackMessage: string = '';
  timeElapsed: number = 0;
  timerInterval: any;
  totalTimeTaken: number = 0;

  constructor(private router: Router) {}
  
  ngOnInit() {
    this.startNewGame();
  }


    startNewGame() {
      this.generateGrid();
      this.foundWords.clear();
      this.selectedWord = '';
      this.selectedCells = [];
      this.score = 0;
      this.gameOver = false;
      this.feedbackMessage = '';
      this.timeElapsed = 0;
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
      }
      this.startTimer();
    }

  changeCategory()
  {
    this.selectedCategory = null;
  }

  selectCategory(category: { name: string, words: string[] }) {
    this.selectedCategory = category;
    this.startNewGame();
  }

  generateGrid() {
    if (!this.selectedCategory) return;
    this.grid = Array.from({ length: 10 }, () => Array(10).fill(''));
    this.selectedCategory.words.forEach(word => {
      this.placeWordInGrid(word);
    });
    this.fillEmptyCells();
  }

  placeWordInGrid(word: string) {
    const length = word.length;
    let placed = false;
    while (!placed) {
      const direction = Math.random() > 0.5 ? 'horizontal' : 'vertical';
      const row = Math.floor(Math.random() * (direction === 'horizontal' ? 10 : 10 - length));
      const col = Math.floor(Math.random() * (direction === 'vertical' ? 10 : 10 - length));
      if (this.canPlaceWord(word, row, col, direction)) {
        for (let i = 0; i < length; i++) {
          this.grid[row + (direction === 'vertical' ? i : 0)][col + (direction === 'horizontal' ? i : 0)] = word[i];
        }
        placed = true;
      }
    }
  }

  canPlaceWord(word: string, row: number, col: number, direction: string): boolean {
    for (let i = 0; i < word.length; i++) {
      const cell = this.grid[row + (direction === 'vertical' ? i : 0)][col + (direction === 'horizontal' ? i : 0)];
      if (cell !== '' && cell !== word[i]) {
        return false;
      }
    }
    return true;
  }

  fillEmptyCells() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.grid.forEach(row => {
      row.forEach((cell, index) => {
        if (cell === '') {
          row[index] = letters[Math.floor(Math.random() * letters.length)];
        }
      });
    });
  }

  selectCell(row: number, col: number) {
    const cell = { row, col };
    if (this.selectedCells.some(c => c.row === row && c.col === col)) {
      return;
    }
    this.selectedCells.push(cell);
    this.selectedWord += this.grid[row][col];
  }

  isSelected(row: number, col: number): boolean {
    return this.selectedCells.some(c => c.row === row && c.col === col);
  }


    submitWord() {
      if (this.selectedCategory?.words.includes(this.selectedWord)) {
        this.foundWords.add(this.selectedWord);
        this.feedbackMessage = this.getRandomPositiveMessage();
        if (this.foundWords.size === this.selectedCategory.words.length) {
          this.gameOver = true;
          this.stopTimer();
          this.feedbackMessage = '¡Bravo! Encontraste todas las palabras';
          this.calculateScore();
        }
      } else {
        this.feedbackMessage = this.getRandomNegativeMessage();
      }
      this.selectedWord = '';
      this.selectedCells = [];
    }

    stopTimer() {
      clearInterval(this.timerInterval);
      this.totalTimeTaken = this.timeElapsed;
    }
  
  
    
      calculateScore() {
        if (this.totalTimeTaken <= 30) {
          this.score = 100;
        } else if (this.totalTimeTaken <= 60) {
          this.score = 75;
        } else if (this.totalTimeTaken <= 120) {
          this.score = 50;
        } else {
          this.score = 25;
        }
      }

  resetSelection() {
    this.selectedWord = '';
    this.selectedCells = [];
    this.feedbackMessage = '';
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }


    startTimer() {
      this.timerInterval = setInterval(() => {
        this.timeElapsed++;
      }, 1000);
    }

  getRandomPositiveMessage(): string {
    const randomIndex = Math.floor(Math.random() * this.positiveMessages.length);
    return this.positiveMessages[randomIndex];
  }

  getRandomNegativeMessage(): string {
    const randomIndex = Math.floor(Math.random() * this.negativeMessages.length);
    return this.negativeMessages[randomIndex];
  }
}

