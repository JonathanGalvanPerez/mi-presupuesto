import { Injectable, Inject, forwardRef } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { AppConfig, APP_CONFIG } from '../app.module';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(@Inject(forwardRef(() => APP_CONFIG)) private config: AppConfig, private http: HttpClient) {}

  login(email: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const headers: HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});
      const req = new HttpRequest('POST', this.config.apiEndpoint + '/login', {'email': email, 'password': password}, { headers: headers });
      this.http.request(req).subscribe((result: HttpResponse<{}>) => {
        if (result.status === 200) {
          if (result.body) {
            localStorage.setItem('userLog', email);
            resolve();
          } else {
            reject();
          }
        }
      });
    });
  }

  logOut(): any {
  	localStorage.removeItem('userLog');
  }

  isLoggedIn(): boolean {
  	return localStorage.getItem('userLog') !== null;
  }

  validateEmail(email: string): Promise<{ [s: string]: boolean }> {
    return new Promise<{ [s: string]: boolean }>((resolve, reject) => {
      const headers: HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});
      const req = new HttpRequest('GET', this.config.apiEndpoint + '/validateEmail?email=' + email, { headers: headers });
      this.http.request(req).subscribe((result: HttpResponse<{}>) => {
        if (result.status === 200)
          resolve(result.body? null: { invalidEmail: true });
      });
    });
  }

  existEmail(email: string): Promise<{ [s: string]: boolean }> {
    return new Promise<{ [s: string]: boolean }>((resolve, reject) => {
      const headers: HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});
      const req = new HttpRequest('GET', this.config.apiEndpoint + '/validateEmail?email=' + email, { headers: headers });
      this.http.request(req).subscribe((result: HttpResponse<{}>) => {
        if (result.status === 200)
          resolve(result.body? { registeredEmail: true }: null);
      });
    });
  }

  createAccount(name: string, email: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const headers: HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});
      const req = new HttpRequest('POST', this.config.apiEndpoint + '/account', { 'name': name, 'email': email, 'password': password }, { headers: headers });
      this.http.request(req).subscribe((result: HttpResponse<{}>) => {
        if (result.status === 200)
          resolve();
      }, err => {
        if(err.status === 409)
          reject();
      });
    });
  }
}
