import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MovementsApiClient } from '../../services/movements-api-client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	errorLog: boolean;

  constructor(public authService: AuthService, private movementsApiClient: MovementsApiClient, private router: Router) {
  	this.errorLog = false;
  }

  ngOnInit(): void {
  }

  login(username: string, password: string): void {
  	this.errorLog = false;
    this.authService.login(username, password, () => {
      if (this.authService.isLoggedIn()) {
        console.log("login delega a la api");
        this.movementsApiClient.loadAccount().then(() => {
          this.router.navigateByUrl('/home');
        });
      } else {
        console.log("login error");
        this.errorLog = true;
        setTimeout(function() {
          this.errorLog = false;
        }.bind(this), 2500);
      }
    });
  }
}
