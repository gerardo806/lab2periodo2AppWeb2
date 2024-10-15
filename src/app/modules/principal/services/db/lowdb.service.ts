import { Injectable } from '@angular/core';
import { Low, Adapter } from 'lowdb';
import {MedicionModel} from '../../../../shared/models/mediciones/medicion.model';

interface Data {
  users: Array<{ id: string, name: string, password: string }>;
  mediciones: Array<MedicionModel>;
}

@Injectable({
  providedIn: 'root'
})
export class LowdbService {
  private db: Low<Data>;

  constructor() {
    const adapter: Adapter<Data> = new LocalStorage<Data>('db'); // Ensure correct typing
    const defaultData: Data = { users: [], mediciones: [] };
    this.db = new Low(adapter, defaultData);
    //this.clearDatabase();
    this.init();
  }

  async init() {
    await this.db.read();
    this.db.data ||= { users: [], mediciones: [] };
    await this.db.write();
  }

  async clearDatabase() {
    this.db.data = { users: [], mediciones: [] };
    await this.db.write();
    console.log('Database cleared and reinitialized:', this.db.data);
  }

  async getUsers() {
    await this.db.read();
    return this.db.data?.users || [];
  }

  async getMediciones() {
    await this.db.read();
    return this.db.data?.mediciones || [];
  }

  async addUser(user: { id: string, name: string, password: string }) {
    await this.db.read();
    this.db.data?.users.push(user);
    await this.db.write();
  }

  async addMedicion(medicion: MedicionModel) {
    await this.db.read();
    this.db.data?.mediciones.push(medicion);
    await this.db.write();
  }

  async deleteUser(userId: string) {
    await this.db.read();
    this.db.data!.users = this.db.data!.users.filter(user => user.id !== userId);
    await this.db.write();
  }

  async deleteMedicion(medicionId: string) {
    await this.db.read();
    this.db.data!.mediciones = this.db.data!.mediciones.filter(medicion => medicion.id !== medicionId);
    await this.db.write();
  }

  async updateUser(userId: string, updatedUser: { name?: string, password?: string }) {
    await this.db.read();
    const user = this.db.data!.users.find(user => user.id === userId);
    if (user) {
      if (updatedUser.name) user.name = updatedUser.name;
      if (updatedUser.password) user.password = updatedUser.password;
      await this.db.write();
    }
  }

  async updateMedicion(medicionId: string, updatedMedicion: MedicionModel) {
    await this.db.read();
    const medicion = this.db.data!.mediciones.find(medicion => medicion.id === medicionId);
    if (medicion) {
      if (updatedMedicion.nic) medicion.nic = updatedMedicion.nic;
      if (updatedMedicion.fechaMedicion) medicion.fechaMedicion = updatedMedicion.fechaMedicion;
      if (updatedMedicion.kwMedido) medicion.kwMedido = updatedMedicion.kwMedido;
      if (updatedMedicion.personaMedicion) medicion.personaMedicion = updatedMedicion.personaMedicion;
      if (updatedMedicion.duenoCuenta) medicion.duenoCuenta = updatedMedicion.duenoCuenta;
      if (updatedMedicion.impuestoExtra) medicion.impuestoExtra = updatedMedicion.impuestoExtra;
      await this.db.write();
    }
  }

  async getUserById(userId: string) {
    await this.db.read();
    return this.db.data!.users.find(user => user.id === userId) || null;
  }

  async getMedicionById(medicionId: string) {
    await this.db.read();
    return this.db.data!.mediciones.find(medicion => medicion.id === medicionId) || null;
  }
}

class LocalStorage<Data> implements Adapter<Data> {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  async read(): Promise<Data | null> {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : null;
  }

  async write(data: Data): Promise<void> {
    localStorage.setItem(this.key, JSON.stringify(data));
  }
}

