import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public formLogin: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formLogin = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  signIn() {
    const condicion: boolean = this.formLogin.invalid;

    if(condicion){
      Object.values(this.formLogin.controls).forEach(control => {
        control.markAsTouched();
      });
    }else{
      console.log('Formulario válido');
    }
  }

  public get formLoginControls(): any {
    return this.formLogin.controls;
  }
}
