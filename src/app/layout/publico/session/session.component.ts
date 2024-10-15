import { Component } from '@angular/core';
import {LoginComponent} from '../../../modules/login/pages/login/login.component';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-session',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './session.component.html',
  styleUrl: './session.component.css'
})
export class SessionComponent {

}
