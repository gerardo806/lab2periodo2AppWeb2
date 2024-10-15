import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {LowdbService} from '../../../principal/services/db/lowdb.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  public formLogin: FormGroup;

  constructor(
    private fb: FormBuilder,
    private lowdbService: LowdbService
  ) {
    this.formLogin = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    });
  }

  async registrarUsuario(){
    const condicion: boolean = this.formLogin.invalid;

    if (condicion) {
      Object.values(this.formLogin.controls).forEach(control => {
        control.markAsTouched();
      });
    }else{
      const credenciales = {
        user: this.formLogin.value.user,
        password: this.formLogin.value.password,
        passwordConfirm: this.formLogin.value.passwordConfirm,
      };

      console.log(credenciales);
      if(credenciales.password !== credenciales.passwordConfirm){
        alert('Las contraseñas no coinciden');
        return;
      }

      const user = {
        id: this.generateRandomId(),
        name: credenciales.user,
        password: credenciales.password
      }

      try {
        await this.lowdbService.addUser(user);
        alert('Usuario registrado correctamente');
      }catch (error) {
        console.error(error);
        alert('Error al registrar usuario');
      }

    }
  }

  public get formLoginControls(): any {
    return this.formLogin.controls;
  }

  private generateRandomId(): string {
    return 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 11);
  }
}
