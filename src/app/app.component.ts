import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AuthUserService} from './shared/services/auth-user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'medicionEnergiaElectrica';

  constructor(private sessionUser: AuthUserService) {
  }
}
