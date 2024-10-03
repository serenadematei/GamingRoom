import { Routes } from '@angular/router';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { ChatComponent } from './components/chat/chat.component';



export const routes: Routes = [   
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path:'home', component:HomeComponent},
    { path:'about-me',component:AboutMeComponent},
    { path:'log-in',component:LoginComponent},
    { path: 'register', component:RegisterComponent},
    { path: 'chat', component:ChatComponent},
    { 
        path: 'hangman', 
        loadComponent: () => import('./games/hangman/hangman.component').then(m => m.HangmanComponent) 
    },
    { 
        path: 'higherLower', 
        loadComponent: () => import('./games/higher-lower/higher-lower.component').then(m => m.HigherLowerComponent) 
    },
    { 
        path: 'trivia', 
        loadComponent: () => import('./games/trivia/trivia.component').then(m => m.TriviaComponent) 
    },
    {path:'word-search',
        loadComponent: () => import('./games/word-search/word-search.component').then(m => m.WordSearchComponent)
    }  
];
