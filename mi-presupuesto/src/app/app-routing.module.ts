import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MovementsManagerComponent } from './components/movements-manager/movements-manager.component';
import { UserLoggedGuard } from './guards/user-logged.guard';

const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full'},
	{ path: 'home', component: HomeComponent, canActivate: [ UserLoggedGuard ]},
	{ path: 'gestor-movimientos', component: MovementsManagerComponent, canActivate: [ UserLoggedGuard ]},
	{ path: 'login', component: LoginComponent},
	{ path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
