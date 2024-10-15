import {Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { LowdbService } from '../../services/db/lowdb.service';
import { MedicionModel } from '../../../../shared/models/mediciones/medicion.model';

import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {AlertsService} from '../../../registro/services/alerts/alerts.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent implements OnInit {

  public formLogin: FormGroup;
  mediciones: MedicionModel[] = [];

  displayedColumns: string[] = ['nic', 'fechaMedicion', 'kwMedido', 'personaMedicion', 'duenoCuenta', 'impuestoExtra', 'acciones'];
  dataSource: MatTableDataSource<MedicionModel> | null = null;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  constructor(
    private fb: FormBuilder,
    private lowdbService: LowdbService,
    private alertsService: AlertsService
  ) {
    this.formLogin = this.fb.group({
      id: [''],
      nic: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(6), Validators.maxLength(10)]],
      fechaMedicion: ['', Validators.required],
      kwMedido: ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],
      personaMedicion: ['', [Validators.required, Validators.pattern('^[A-Za-zÑñÁÉÍÓÚáéíóú ]+$')]],
      duenoCuenta: ['', [Validators.required, Validators.pattern('^[A-Za-zÑñÁÉÍÓÚáéíóú ]+$')]],
      impuestoExtra: ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],
    });
  }

  ngOnInit(): void {
    this.obtenerMediciones();
  }

  async obtenerMediciones() {
    try {
      this.mediciones = await this.lowdbService.getMediciones();
      this.dataSource = new MatTableDataSource(this.mediciones);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } catch (error) {
      console.error(error);
      this.mediciones = [];
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(this.dataSource){
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource!.paginator) {
        this.dataSource.paginator.firstPage();
      }
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

        this.alertsService.showSuccess('Operación realizada correctamente');
        // Cerrar la ventana modal
        const btnCerrarModal = document.getElementById('cerrar-modal-medicion');
        if(btnCerrarModal){
          btnCerrarModal.click();
        }

        // Limpiar los campos del formulario
        this.formLogin.reset();

        await this.obtenerMediciones();
      }catch (error) {
        console.error(error);
        this.alertsService.showError('Error al registrar la medición');
      }

    }
  }

  editarMedicion(medicionId: string){
    const medicion = this.mediciones.find(m => m.id === medicionId);
    if(medicion){
      this.formLogin.setValue({
        id: medicion.id,
        nic: medicion.nic,
        fechaMedicion: medicion.fechaMedicion,
        kwMedido: medicion.kwMedido,
        personaMedicion: medicion.personaMedicion,
        duenoCuenta: medicion.duenoCuenta,
        impuestoExtra: medicion.impuestoExtra
      });
    }
  }

  async eliminarMedicion(medicionId: string) {
    const confirmed = await this.alertsService.showConfirmation('¿Estás seguro de que deseas continuar?');
    if (confirmed) {
      try {
        await this.lowdbService.deleteMedicion(medicionId);
        await this.obtenerMediciones();
        this.alertsService.showSuccess('Medición eliminada correctamente');
      }catch (error) {
        console.error(error);
        this.alertsService.showError('Error al eliminar la medición');
      }
    }
  }

  limpiarFormulario(){
    this.formLogin.reset();
  }

  public get formLoginControls(): any {
    return this.formLogin.controls;
  }

  private generateRandomId(): string {
    return 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 11);
  }
}
