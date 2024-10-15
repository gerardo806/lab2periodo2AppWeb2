import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {AuthService} from '../../../modules/principal/services/auth.service';

@Component({
  selector: 'app-contenido',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './contenido.component.html',
  styleUrl: './contenido.component.css'
})
export class ContenidoComponent {
  constructor(private service: AuthService, private route: Router) { }

  logout() {
    this.service.logout();
    this.route.navigate(['/init/login']);
  }
}
