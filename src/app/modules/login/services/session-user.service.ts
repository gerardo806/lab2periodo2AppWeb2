import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionUserService {
  private nombre: string = '';

  constructor() { }

  public get getNombre(): string {
    return this.nombre;
  }

  public set setNombre(nombre: string) {
    this.nombre = nombre;
  }
}
