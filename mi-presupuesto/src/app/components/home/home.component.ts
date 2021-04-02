import { Component, OnInit } from '@angular/core';
import { MovementsApiClient } from '../../services/movements-api-client.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	public balance: number;

  constructor(public movementsApiClient: MovementsApiClient) {
  	movementsApiClient.subscribeOnChangeBalance(balance => this.balance = balance);
  }

  ngOnInit(): void {}

  getMovements() {
  	return this.movementsApiClient.getLastMovements();
  }

  trackElement(index: number, element: any) {
  	return element ? element.id : null; 
  }

}
