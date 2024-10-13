import { Routes } from '@angular/router';
import {LoginComponent} from './layout/publico/login/login.component';
import {MainComponent} from './layout/privado/main/main.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: MainComponent },
];
