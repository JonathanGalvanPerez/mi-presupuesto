import { Injectable, Inject, forwardRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Movement } from '../models/movement.model';
import { APP_CONFIG, AppConfig } from '../app.module';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class MovementsApiClient {
  email: string;
  name: string;
  balance: BehaviorSubject<number>;
  movements: Movement[];
  movements$: BehaviorSubject<Movement[]>;

  constructor(@Inject(forwardRef(() => APP_CONFIG)) private config: AppConfig, private http: HttpClient, private router: Router) {
    this.balance = new BehaviorSubject<number>(0);
    this.movements$ = new BehaviorSubject<Movement[]>([]);
  }

  loadAccount(): Promise<void> {
    this.email = localStorage.getItem('userLog');
    if (this.email === null) {
      console.log("userLog no existe. No se cargan los datos");
      return null;
    }
    return new Promise<void>((resolve, reject) => {
      console.log("userLog existe. Se cargan los datos de");
      console.log(this.email);
      var authToken = localStorage.getItem('authToken');
      const headers: HttpHeaders = new HttpHeaders({'authorization': authToken});
      const req = new HttpRequest('GET', this.config.apiEndpoint + '/secure/account?email=' + this.email, { headers: headers });
      this.http.request(req).subscribe((data: HttpResponse<{}>) => {
        if(data.status === 200) {
          let response: any = data.body[0];
          this.email = response.email;
          this.name = response.name;
          this.balance.next(response.balance as number);
          this.loadMovements().then(() => resolve());
        }
      }, error => {
        console.log("Error http");
        console.log(error);
        if(error.status === 401){
          localStorage.clear();
          sessionStorage.setItem("invalidToken", "");
          resolve();
        }
      });
    });
  }

  loadMovements() {
    return new Promise<void>((resolve, reject) => {
      var authToken = localStorage.getItem('authToken');
      const headers: HttpHeaders = new HttpHeaders({'authorization': authToken});
      const req = new HttpRequest('GET', this.config.apiEndpoint + '/secure/allMovements?user_email=' + this.email, { headers: headers });
      this.http.request(req).subscribe((data: HttpResponse<{}>) => {
        if(data.status === 200) {
          var response: any = data.body;
          var allMovements = response.map(m => new Movement(m.mount, m.type, m.category, m.concept, m.date, m.user_email, m.id));
          this.movements = allMovements;
          this.movements$.next(this.movements);
          resolve();
        }
      });
    });
  }

  edit(mount: number, oldMount: number, type: string, category: number, concept: string, id: string) {
    var authToken = localStorage.getItem('authToken');
    const headers: HttpHeaders = new HttpHeaders({'authorization': authToken});
    const req = new HttpRequest('PUT', this.config.apiEndpoint + '/secure/movement', { 'mount': mount, 'category': category, 'concept': concept, 'id': id }, { headers: headers });
    this.http.request(req).subscribe((data: HttpResponse<{}>) => {
      if(data.status === 200) {
        let movement: Movement = this.movements.find(movement => movement.id == id);
        movement.setMount(mount);
        movement.setConcept(concept);
        movement.setCategory(category);
        this.movements$.next(this.movements);
        console.log("se edito el registro");
        let oldBalance = this.balance.getValue();
        if (type == "Ingreso")
          this.balance.next((oldBalance - oldMount) + mount);
        else
          this.balance.next((oldBalance + oldMount) - mount);
        this.updateBalance();
      }
    }, error => {
      if(error.status === 401)
        this.revokeLogin();
    });
  }

  add(movement: Movement) {
    var authToken = localStorage.getItem('authToken');
    const headers: HttpHeaders = new HttpHeaders({'authorization': authToken});
    const req = new HttpRequest('POST', this.config.apiEndpoint + '/secure/movement', movement, { headers: headers });
    this.http.request(req).subscribe((data: HttpResponse<{}>) => {
      if(data.status === 200) {
        this.movements.unshift(movement);
        this.movements$.next(this.movements);
        console.log("se agrego el registro");
        let balance = this.balance.getValue();
        if (movement.type == "Ingreso")
          this.balance.next(balance + movement.mount);
        else
          this.balance.next(balance - movement.mount);
        this.updateBalance();
      }
    }, error => {
      if(error.status === 401)
        this.revokeLogin();
    });
  }

  delete(id: string) {
    console.log("Se recibio el llamado a delete")
    var authToken = localStorage.getItem('authToken');
    const headers: HttpHeaders = new HttpHeaders({'authorization': authToken});
    const req = new HttpRequest('DELETE', this.config.apiEndpoint + '/secure/movement?id=' + id, { headers: headers });
    this.http.request(req).subscribe((data: HttpResponse<{}>) => {
      if(data.status === 200) {
        let index = this.movements.findIndex(movement => movement.id === id);
        let deleted = this.movements.splice(index, 1);
        this.movements$.next(this.movements);
        console.log("se elimino el registro");
        let oldBalance = this.balance.getValue();
        if(deleted[0].type === 'Ingreso')
          this.balance.next(oldBalance-deleted[0].mount);
        else
          this.balance.next(oldBalance+deleted[0].mount);
        this.updateBalance();
      }
    }, error => {
      if(error.status === 401)
        this.revokeLogin();
    });
  }

  updateBalance() {
    console.log("Se ejecuto la actualizancion del balance");
    var authToken = localStorage.getItem('authToken');
    const headers: HttpHeaders = new HttpHeaders({'authorization': authToken});
    const req = new HttpRequest('PUT', this.config.apiEndpoint + '/secure/balance', { 'balance': this.balance.getValue(), 'email': this.email }, { headers: headers });
    this.http.request(req).subscribe((data: HttpResponse<{}>) => {
      if(data.status === 200)
        console.log("se actualizo el balance");
    });
  }

  revokeLogin() {
    console.log("Token invalido. Se removieron las credenciales.");
    localStorage.clear();
    this.router.navigateByUrl('/login', { state: { invalidToken: true } });
  }

  subscribeOnChangeBalance(fn) {
    this.balance.subscribe(fn);
  }

  subscribeOnChangeMovements(fn) {
    this.movements$.subscribe(fn);
  }

  getName = () => this.name;
  getEmail = () => this.email;
}
