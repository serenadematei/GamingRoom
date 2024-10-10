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

  juegos = ['Ahorcado', 'Mayor Menor', 'Aventura Global', 'Letras Enredadas']; 
  juegoSeleccionado: string = ''; 
  resultados: any[] = []; 

  constructor(private resultadosService: ResultadosService) {}

  ngOnInit() {}


  seleccionarJuego(juego: string) {
    this.juegoSeleccionado = juego;

    this.resultadosService.obtenerResultados().subscribe(data => {
      this.resultados = data.filter((resultado: any) => resultado.juego === juego);
    });
  }

}
