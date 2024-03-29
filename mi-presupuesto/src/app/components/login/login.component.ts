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
  newAccountAlert = false;
  invalidToken = false;

  constructor(private fb: FormBuilder, public authService: AuthService, private movementsApiClient: MovementsApiClient, public router: Router) {
    let state = this.router.getCurrentNavigation().extras.state;
    if(state){
      if(state.newAccountAlert)
        this.newAccountAlert = state.newAccountAlert;
      if(state.invalidToken)
        this.invalidToken = state.invalidToken;
    }
  }

  ngOnInit(): void {
    this.fg = this.fb.group({
      email: ['', Validators.required, this.emailValidator(this.authService)],
      password: ['', Validators.required]
    })
    this.errorLog = false;
  }

  login(): void {
  	this.errorLog = false;
    let email = this.fg.get('email').value;
    let password = this.fg.get('password').value;
    this.authService.login(email, password).then(
      () => this.movementsApiClient.loadAccount().then(
        () => this.router.navigateByUrl('/home')
      )
    ).catch(() => {
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

  get email() {
    return this.fg.get('email');
  }

}
