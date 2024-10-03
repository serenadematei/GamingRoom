import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RouterModule,RouterOutlet } from '@angular/router';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,RouterOutlet,CommonModule, NgIf, NgFor], 
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  user: User | null = null;
  isGuestUser:boolean = false;


  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user) => {
      this.user = user;
      this.isGuest();
    });
   
  }

 
  isGuest(): void {
    this.isGuestUser = this.user?.email === 'invitado@gmail.com' ? true : false;
  }
  

  logout(): void {
    this.authService.signOut().then(() => {
      this.router.navigate(['/log-in']);
    });
  }
}