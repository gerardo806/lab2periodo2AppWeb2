import { Injectable } from '@angular/core';
import { AuthUser } from "../models/login/login.model";

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  public loginSignIn: boolean = false;
  constructor() { }

  public sessionActive(user: AuthUser): boolean {
    this.loginSignIn = user.user === 'admin' && user.password === 'admin';
    return this.loginSignIn;
  }

  public sessionLogin(): boolean {
    return this.loginSignIn;
  }
}
