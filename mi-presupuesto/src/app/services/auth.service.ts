import { Injectable, Inject, forwardRef } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { AppConfig, APP_CONFIG } from '../app.module';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(@Inject(forwardRef(() => APP_CONFIG)) private config: AppConfig, private http: HttpClient) {}

  login(email: string, password: string, callback): void {
    let logged: boolean;
    const headers: HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});
    const req = new HttpRequest('POST', this.config.apiEndpoint + '/login', {'email': email, 'password': password}, { headers: headers });
    this.http.request(req).subscribe((result: HttpResponse<{}>) => {
      if (result.status === 200 && result.body) {
        localStorage.setItem('userLog', email);
        callback();
      }
    });
  }

  logOut(): any {
  	localStorage.removeItem('userLog');
  }

  isLoggedIn(): boolean {
  	return localStorage.getItem('userLog') !== null;
  }
}
