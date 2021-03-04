import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MovementsManagerComponent } from './components/movements-manager/movements-manager.component';
import { MovementsApiClient } from './services/movements-api-client.service';
import { AuthService } from './services/auth.service';
import { MovementComponent } from './components/movement/movement.component';
import { FormMovementComponent } from './components/form-movement/form-movement.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    MovementsManagerComponent,
    MovementComponent,
    FormMovementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    MovementsApiClient,
    AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
