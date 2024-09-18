import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { User } from 'firebase/auth';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('800ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('800ms', style({ opacity: 0 }))
      ])
    ])
  ]
})

export class HomeComponent implements OnInit {

  userEmail: string | null = null;
  userName : string = ''
  games = [
    { title: 'Game 1', text: 'Description of Game 1', img: 'assets/med.jpg', path: '/game1' },
    { title: 'Game 2', text: 'Description of Game 2', img: 'assets/med.jpg', path: '/game2' },
  ];


  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user: User | null) => {
      this.userEmail = user?.email || null;
    });
  }

  goTo(path: string):void{
    this.router.navigate([path])
  }

  playGame(path: string): void {
    this.router.navigate([path]);
  }

  getUserNameFromEmail(){
    if (!this.userEmail) {
      return null;
    }
    else
    {
      const atIndex = this.userEmail.indexOf('@'); 
      if (atIndex !== -1) {
        this.userName = this.userEmail.substring(0, atIndex); 
        return this.userName
      } else {
        return null; 
      }
    }
  }
}
 
