import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCollapse = true;

  constructor(public authService: AuthService) {}

  toggleCollapse() {
  	if (screen.width < 768)
	  	this.isCollapse = !this.isCollapse;
  }
}
