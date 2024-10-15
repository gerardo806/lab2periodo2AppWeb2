import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AuthUserService} from './shared/services/auth-user.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'medicionEnergiaElectrica';

  constructor(private sessionUser: AuthUserService) {
  }
}
