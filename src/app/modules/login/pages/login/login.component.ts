import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from '../../../principal/services/auth.service';
import {LowdbService} from '../../../principal/services/db/lowdb.service';
import {SessionUserService} from '../../services/session-user.service';
import {AlertsService} from '../../../registro/services/alerts/alerts.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public formLogin: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authServices: AuthService,
    private lowdbService: LowdbService,
    private sessionUser: SessionUserService,
    private alerts: AlertsService
  ) {
    this.formLogin = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async signIn() {
    const condicion: boolean = this.formLogin.invalid;

    if (condicion) {
      Object.values(this.formLogin.controls).forEach(control => {
        control.markAsTouched();
      });
    } else {
      const credenciales = {
        user: this.formLogin.value.user,
        password: this.formLogin.value.password
      };

      const users = await this.lowdbService.getUsers();
      const user = users.find(u => u.name === credenciales.user && u.password === credenciales.password);

      if (!user) {
        this.alerts.showError('Usuario o contraseña incorrectos');
        this.authServices.logout();
      } else {
        this.sessionUser.setNombre = user.name || '';
        this.authServices.login();
        if (this.authServices.isAuthenticated()) {
          this.router.navigate(["/home/principal"]).catch(err => {
            console.error('Navigation error:', err);
          });
        }
      }
    }
  }

  public get formLoginControls(): any {
    return this.formLogin.controls;
  }
}
