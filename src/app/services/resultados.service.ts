import { Injectable } from '@angular/core';
//import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service'; // Servicio de autenticación
import { Firestore, collectionData, collection, addDoc, Timestamp } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
//import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ResultadosService {
 
    constructor(private firestore: Firestore, private authService: AuthService) {}

    // Método para guardar el resultado
    async guardarResultado(juego: string, score: number): Promise<void> {
        try {
          const user = await this.authService.getCurrentUser(); // Obtenemos el usuario autenticado
          const email = user?.email || 'anonimo'; // Usamos el email del usuario o 'anonimo' si no existe
          //const fecha = new Date().toLocaleDateString('es-ES'); // Fecha actual en formato español
          const fechaYHora = `${new Date().toLocaleDateString('es-ES', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
          })} ${new Date().toLocaleTimeString('es-ES', { 
            hour: '2-digit', 
            minute: '2-digit', 
          })}`;


          const resultado = {
            email,
            fechaYHora,
            juego,
            score
          };
    
          const col = collection(this.firestore, 'resultados');
          
          // Intentar guardar el resultado y agregar console.log() para verificar si se guardó
          await addDoc(col, resultado);
          console.log('Resultado guardado exitosamente:', resultado);
          
        } catch (error) {
          console.error('Error al guardar el resultado:', error);
        }
      }
  
     // Método para obtener todos los resultados
   obtenerResultados(): Observable<any[]> {
    const col = collection(this.firestore, 'resultados'); // Referencia a la colección 'resultados'
    return collectionData(col, { idField: 'id' }); // Obtener los datos de la colección
  }

   // Método para guardar las respuestas de la encuesta
   async guardarEncuesta(respuestas: any): Promise<void> {
    try {
      const user = await this.authService.getCurrentUser(); // Obtener usuario autenticado
      const email = user?.email || 'anonimo'; // Usar el email del usuario o 'anonimo' si no está autenticado
      const fecha = new Date().toLocaleDateString('es-ES', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      });

      const encuesta = {
        email,
        fecha,
        ...respuestas // Guardamos las respuestas del formulario
      };

      const col = collection(this.firestore, 'encuestas'); // Guardamos en la colección 'encuestas'
      await addDoc(col, encuesta);
      console.log('Encuesta guardada exitosamente:', encuesta);

    } catch (error) {
      console.error('Error al guardar la encuesta:', error);
    }
  }
}


