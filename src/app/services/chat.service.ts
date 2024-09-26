import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, addDoc, Timestamp } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { User } from '@angular/fire/auth';

export interface ChatMessage {
  user: string;
  message: string;
  timestamp: Timestamp;
}

@Injectable({
    providedIn: 'root'
  })
  export class ChatService {
    private chatCollection;
    private counter = 0;
  

    constructor(private firestore: Firestore, private authService: AuthService) {
      this.chatCollection = collection(this.firestore, 'chats');
    }
  
    async sendMessage(message: string): Promise<void> {
      const currentUser = await this.authService.getCurrentUser();
      
      let email = currentUser?.email 
      if(email == "invitado@gmail.com")
        {
          email = "Invitado anónimo"
        }
      await addDoc(this.chatCollection, {
        user: email,
        message: message,
        timestamp: Timestamp.now()
      });
    }
  
    getMessages(): Observable<ChatMessage[]> {
      return collectionData(this.chatCollection, { idField: 'id' }) as Observable<ChatMessage[]>;
    }
    
  }
