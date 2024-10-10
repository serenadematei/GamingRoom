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

    
    async guardarResultado(juego: string, score: number): Promise<void> {
        try {
          const user = await this.authService.getCurrentUser(); 
          const email = user?.email || 'anonimo';
          
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
          
          
          await addDoc(col, resultado);
          console.log('Resultado guardado exitosamente:', resultado);
          
        } catch (error) {
          console.error('Error al guardar el resultado:', error);
        }
      }
  
     
   obtenerResultados(): Observable<any[]> {
    const col = collection(this.firestore, 'resultados');
    return collectionData(col, { idField: 'id' }); 
  }


   async guardarEncuesta(respuestas: any): Promise<void> {
    try {
      const user = await this.authService.getCurrentUser(); 
      const email = user?.email || 'anonimo'; 
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
        ...respuestas 
      };

      const col = collection(this.firestore, 'encuestas'); 
      await addDoc(col, encuesta);
      console.log('Encuesta guardada exitosamente:', encuesta);

    } catch (error) {
      console.error('Error al guardar la encuesta:', error);
    }
  }
}


