import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken, APP_INITIALIZER } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MovementsManagerComponent } from './components/movements-manager/movements-manager.component';
import { MovementsApiClient } from './services/movements-api-client.service';
import { AuthService } from './services/auth.service';
import { MovementComponent } from './components/movement/movement.component';
import { FormAddMovementComponent } from './components/form-add-movement/form-add-movement.component';
import { FormEditMovementComponent } from './components/form-edit-movement/form-edit-movement.component';
import { UserLoggedGuard } from './guards/user-logged.guard';


// api config
export interface AppConfig {
  apiEndpoint: string;
}
const APP_CONFIG_VALUE: AppConfig = {
  apiEndpoint: 'http://localhost:3000'
}
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config'); 

export function init_app(movementsApiClient: MovementsApiClient): () => Promise<any> {
  console.log("initializer se ejecuto");
  return () => movementsApiClient.loadAccount();
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    MovementsManagerComponent,
    MovementComponent,
    FormAddMovementComponent,
    FormEditMovementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    MovementsApiClient,
    AuthService,
    UserLoggedGuard,
    { provide: APP_CONFIG, useValue: APP_CONFIG_VALUE },
    { provide: APP_INITIALIZER, useFactory: init_app, deps: [MovementsApiClient], multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
