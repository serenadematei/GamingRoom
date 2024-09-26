import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild} from '@angular/core';
import { ChatService, ChatMessage } from '../../services/chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, NgIf,CommonModule,NgFor],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('500ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
    
})

export class ChatComponent implements OnInit, AfterViewChecked{

  @ViewChild('messageContainer') private messageContainer!: ElementRef;
  messages: ChatMessage[] = [];
  newMessage: string = '';
  errorMessage: string = '';
  currentUserEmail: string = ''; 

  constructor(private chatService: ChatService, private authService: AuthService) { }
  

  ngOnInit(): void {

    this.authService.getCurrentUser().then(user => {
      if (user) {
        this.currentUserEmail = user.email || ''; 
        console.log(this.currentUserEmail);
      }

      this.chatService.getMessages().subscribe(messages => {
        this.messages = messages.filter(message => message.timestamp).sort((a, b) => a.timestamp.seconds - b.timestamp.seconds);
        this.scrollToBottom();
      });
    });
  }
  

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }
  
  private scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Scroll to bottom failed:', err);
    }
  }

  sendMessage(): void {
    if (this.newMessage.trim() !== '') {
      this.chatService.sendMessage(this.newMessage).then(() => {
        this.newMessage = '';
      
      }).catch((error) => {
        this.errorMessage = 'Error al enviar mensaje';
      });
    }
  }
   
}

