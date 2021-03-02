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
  	this.balance = this.movementsApiClient.getBalance();
  }

  ngOnInit(): void {
  }

}
