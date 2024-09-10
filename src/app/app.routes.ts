import { Routes } from '@angular/router';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [   
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path:'home', component:HomeComponent},
    { path:'about-me',component:AboutMeComponent},
    { path:'log-in',component:LoginComponent},
    { path: 'register', component:RegisterComponent}
];
