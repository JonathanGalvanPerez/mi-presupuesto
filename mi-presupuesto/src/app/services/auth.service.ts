import { Injectable } from '@angular/core';
import { MovementsApiClient } from './movements-api-client.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private movementsApiClient: MovementsApiClient) {}

  login(email: string, password: string) {
  	if (email == "jorge@email.com" && password == "123") {
  		localStorage.setItem('userLog', email);
  		this.movementsApiClient.loadAccount(email);
  		return true;
  	}
  	return false;
  }

  logout(): any {
  	localStorage.removeItem('userLog');
  }

  getUser(): any {
  	return localStorage.getItem('userLog');
  }

  isLoggedIn(): boolean {
  	return this.getUser() !== null;
  }
}
