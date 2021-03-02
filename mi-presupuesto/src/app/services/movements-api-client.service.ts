import { Injectable } from '@angular/core';
import { Movement } from '../models/movement.model';

@Injectable({
  providedIn: 'root'
})
export class MovementsApiClient {
  name: string;
  email: string;
  balance: number;
  lastMovements: Movement[];

  constructor() {}

  loadAccount(email: string) {
    let name = "Jorge";
    let balance = 400;
    let lastMovements = [
      new Movement(1000, "recarga en efectivo", "2021-01-10", "ingreso"),
      new Movement(200, "carga SUBE", "2021-01-10", "ingreso"),
      new Movement(400, "carga celular", "2021-01-10", "ingreso"),
    ]
    this.name = name;
    this.email = email;
    this.balance = balance;
    this.lastMovements = lastMovements;
  }

  getBalance = () => this.balance;
  getName = () => this.name;
  getLastMovements = () => this.lastMovements;
}
