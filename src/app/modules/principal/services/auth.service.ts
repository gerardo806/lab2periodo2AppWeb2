import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authenticated = false;

  constructor() {}

  login(): void {
    this.authenticated = true;
    localStorage.setItem('auth', 'true');
  }

  logout(): void {
    this.authenticated = false;
    localStorage.setItem('auth', 'false');
  }

  isAuthenticated(): boolean {
    //localStorage.getItem('auth') === 'true' ? this.authenticated = true : this.authenticated = false;
    return this.authenticated;
  }
}
