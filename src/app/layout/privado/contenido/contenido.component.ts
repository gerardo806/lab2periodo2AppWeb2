import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {AuthService} from '../../../modules/principal/services/auth.service';
import {SessionUserService} from '../../../modules/login/services/session-user.service';

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
export class ContenidoComponent implements OnInit {
  private nombre: string = '';
  constructor(private service: AuthService, private route: Router, private sessionUser: SessionUserService) { }

  ngOnInit(): void {
        this.nombre = this.sessionUser.getNombre || '';
    }

  logout() {
    this.service.logout();
    this.route.navigate(['/init/login']);
  }

  public get getNombre(): string {
    return this.nombre;
  }

  public set setNombre(nombre: string) {
    this.nombre = nombre;
  }
}
