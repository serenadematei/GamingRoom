import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { ResultadosService } from '../services/resultados.service';

@Component({
  selector: 'app-listado-resultados',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './listado-resultados.component.html',
  styleUrl: './listado-resultados.component.css'
})
export class ListadoResultadosComponent implements OnInit {

  juegos = ['Ahorcado', 'Mayor Menor', 'Aventura Global', 'Letras Enredadas']; // Lista de juegos
  juegoSeleccionado: string = ''; // Juego seleccionado por el usuario
  resultados: any[] = []; // Resultados filtrados por el juego seleccionado

  constructor(private resultadosService: ResultadosService) {}

  ngOnInit() {}

  // Método para cambiar el juego seleccionado
  seleccionarJuego(juego: string) {
    this.juegoSeleccionado = juego;

    // Obtener resultados del juego seleccionado
    this.resultadosService.obtenerResultados().subscribe(data => {
      // Filtrar los resultados por el juego seleccionado
      this.resultados = data.filter((resultado: any) => resultado.juego === juego);
    });
  }

}
