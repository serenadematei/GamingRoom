// app.component.ts
import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ResultadosService } from '../../services/resultados.service';

@Component({
  selector: 'app-trivia',
  standalone: true,
  imports: [FormsModule,NgIf,CommonModule,NgFor],  
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.css']
})
export class TriviaComponent implements OnInit {
  countries: any[] = [];
  question: any;
  options: any[] = [];
  userAnswer: string = '';
  score: number = 0;
  errors: number = 0;
  usedCountries: Set<string> = new Set();
  status:string = "Starting"
  optionsAvailable:boolean=false

  constructor(private countriesService: CountriesService, private router: Router, private resultadosService:ResultadosService) {}

  ngOnInit() {
    this.countriesService.getAllCountries().subscribe(data => {
      this.countries = this.shuffleArray(data);
      this.generateQuestion();
    });
  }

  startGame(): void{
    this.optionsAvailable=true;
    this.status="Playing"
  }

  generateQuestion() {
    if (this.countries.length === this.usedCountries.size) {
      alert('No more countries left. Restart the game.');
      return;
    }

    let randomCountry;
    do {
      randomCountry = this.countries[Math.floor(Math.random() * this.countries.length)];
    } while (this.usedCountries.has(randomCountry.name.common));

    this.question = randomCountry;
    this.usedCountries.add(this.question.name.common);
    this.options = [this.question];

    while (this.options.length < 3) {
      const randomOption = this.countries[Math.floor(Math.random() * this.countries.length)];
      if (!this.options.some(option => option.name.common === randomOption.name.common)) {
        this.options.push(randomOption);
      }
    }

    this.options = this.shuffleArray(this.options);
  }

  checkAnswer(selectedCountry: any, event: Event) {

    const button = event.target as HTMLButtonElement;
    if (button) {
      if (selectedCountry.name.common === this.question.name.common) {
        button.style.backgroundColor = 'green';
        this.score++;
      } else {
        button.style.backgroundColor = 'red';
        this.errors++;
        if (this.errors >= 3) {
          setTimeout(() => {
            this.finalizarJuego();
          }, 1000);
          return;
        }
      }

      setTimeout(() => {
        button.style.backgroundColor = '';
        this.generateQuestion();
      }, 1000);
    }
  }

  restartGame() {
    this.score = 0;
    this.errors = 0;
    this.usedCountries.clear();
    this.generateQuestion();
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  finalizarJuego() {
    // Guardar el resultado del juego
    if(this.score > 0 )
    {
      this.resultadosService.guardarResultado('Aventura Global', this.score)
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

