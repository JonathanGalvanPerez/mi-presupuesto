import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MovementsApiClient } from '../../services/movements-api-client.service';
import { FormGroup, FormBuilder, FormControl, Validators, AsyncValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	fg: FormGroup;
  password: FormGroup;
  errorCreate = false;

  constructor(private fb: FormBuilder, public authService: AuthService, private movementsApiClient: MovementsApiClient, public router: Router) {}

  ngOnInit(): void {
    this.fg = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.email
      ], this.emailValidator(this.authService)]
    });
    this.password = this.fb.group({
      createdPassword: ['', Validators.required],
      confirmedPassword: ['', Validators.required]
    }, { validators: this.samePassword });
  }

  register() {
  	let fullName = this.fullName.value;
    let email = this.email.value;
    let password = this.createdPassword.value;
    this.authService.createAccount(fullName, email, password).then(
      () => this.router.navigateByUrl('/login', { state: { newAccountAlert: true } }),
      () => this.errorCreate = true
    );
  }

  emailValidator(authService: AuthService): AsyncValidatorFn {
    return (control: FormControl): Promise<{ [s: string]: boolean }> => {
      return authService.existEmail(control.value);
    }
  }

  samePassword(group: FormGroup): { [s: string]: boolean } {
  	if(group.get('createdPassword').value == group.get('confirmedPassword').value)
      return null;
    else
      return { differentPassword: true };
  }

  get fullName() {
    return this.fg.get('fullName');
  }

  get email() {
    return this.fg.get('email');
  }

  get createdPassword() {
    return this.password.get('createdPassword');
  }

  get confirmedPassword() {
    return this.password.get('confirmedPassword');
  }
}
