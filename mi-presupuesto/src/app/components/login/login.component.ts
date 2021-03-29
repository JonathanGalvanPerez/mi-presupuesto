import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MovementsApiClient } from '../../services/movements-api-client.service';
import { FormGroup, FormBuilder, FormControl, Validators, AsyncValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  fg: FormGroup;
	errorLog: boolean;

  constructor(private fb: FormBuilder, public authService: AuthService, private movementsApiClient: MovementsApiClient, private router: Router) {}

  ngOnInit(): void {
    this.fg = this.fb.group({
      email: ['', [Validators.required], this.emailValidator(this.authService)],
      password: ['', Validators.required]
    })
    this.errorLog = false;
  }

  login(): void {
  	this.errorLog = false;
    let email = this.fg.controls['email'].value;
    let password = this.fg.controls['password'].value;
    this.authService.login(email, password).then(() => {
      this.movementsApiClient.loadAccount().then(() => {
        this.router.navigateByUrl('/home');
      });
    }, () => {
      this.errorLog = true;
      setTimeout(function() {
        this.errorLog = false;
      }.bind(this), 2500);
    });
  }

  emailValidator(authService: AuthService): AsyncValidatorFn {
    return (control: FormControl): Promise<{ [s: string]: boolean }> => {
      return authService.validateEmail(control.value);
    }
  }

}
