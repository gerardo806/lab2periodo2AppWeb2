import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { LowdbService } from '../../services/db/lowdb.service';
import { MedicionModel } from '../../../../shared/models/mediciones/medicion.model';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent implements OnInit {
  public formLogin: FormGroup;
  mediciones: MedicionModel[] = [];

  constructor(
    private fb: FormBuilder,
    private lowdbService: LowdbService
  ) {
    this.formLogin = this.fb.group({
      id: [''],
      nic: ['', Validators.required],
      fechaMedicion: ['', Validators.required],
      kwMedido: ['', Validators.required],
      personaMedicion: ['', Validators.required],
      duenoCuenta: ['', Validators.required],
      impuestoExtra: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.obtenerMediciones();
  }

  async obtenerMediciones() {
    try {
      this.mediciones = await this.lowdbService.getMediciones();
    } catch (error) {
      console.error(error);
      this.mediciones = [];
    }
  }

  async registrarMedicion(){
    const condicion: boolean = this.formLogin.invalid;

    if (condicion) {
      Object.values(this.formLogin.controls).forEach(control => {
        control.markAsTouched();
      });
    }else{
      const credenciales = {
        id: this.formLogin.value.id,
        nic: this.formLogin.value.nic,
        fechaMedicion: this.formLogin.value.fechaMedicion,
        kwMedido: this.formLogin.value.kwMedido,
        personaMedicion: this.formLogin.value.personaMedicion,
        duenoCuenta: this.formLogin.value.duenoCuenta,
        impuestoExtra: this.formLogin.value.impuestoExtra
      };

      console.log(credenciales);
      let nuevo = false;
      let medicionNueva = null;

      if(credenciales.id !== "" && credenciales.id !== null){
        medicionNueva = {
          id: credenciales.id,
          nic: credenciales.nic,
          fechaMedicion: credenciales.fechaMedicion,
          kwMedido: credenciales.kwMedido,
          personaMedicion: credenciales.personaMedicion,
          duenoCuenta: credenciales.duenoCuenta,
          impuestoExtra: credenciales.impuestoExtra
        }
      }else {
        medicionNueva = {
          id: this.generateRandomId(),
          nic: credenciales.nic,
          fechaMedicion: credenciales.fechaMedicion,
          kwMedido: credenciales.kwMedido,
          personaMedicion: credenciales.personaMedicion,
          duenoCuenta: credenciales.duenoCuenta,
          impuestoExtra: credenciales.impuestoExtra
        }

        nuevo = true;
      }

      try {
        if(nuevo){
          await this.lowdbService.addMedicion(medicionNueva);
        }else{
          await this.lowdbService.updateMedicion(medicionNueva.id, medicionNueva);
        }

        alert('operación realizada correctamente');
      }catch (error) {
        console.error(error);
        alert('Error al registrar la medición');
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
