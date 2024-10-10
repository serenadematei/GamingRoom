import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { ResultadosService } from '../services/resultados.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-encuesta',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.css'
})
export class EncuestaComponent implements OnInit {
  encuestaForm!: FormGroup;

  constructor(private fb: FormBuilder, private resultadosService: ResultadosService, private router: Router ) {}

  ngOnInit(): void {
    this.encuestaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z\\s]+$')]],
      apellido: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z\\s]+$')]],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      pregunta1: ['', Validators.required], 
      pregunta2: [false], 
      pregunta3: ['', Validators.required]  
    });
  }


  async onSubmit(): Promise<void> {
    if (this.encuestaForm.valid) {
      const respuestas = this.encuestaForm.value; 
      try {
        await this.resultadosService.guardarEncuesta(respuestas); 
        
        Swal.fire({
          title: '¡Respuesta enviada!',
          text: 'Gracias por contestar la encuesta.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/home']); 
        });

      } catch (error) {
        console.error('Error al guardar la encuesta:', error);

        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al enviar la encuesta. Por favor, inténtelo nuevamente.',
          icon: 'error',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/home']); 
        });
      }
    } else {

      Swal.fire({
        title: 'Formulario incompleto',
        text: 'Por favor, complete todos los campos correctamente.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
  }
  
  get f() {
    return this.encuestaForm.controls;
  }
}
