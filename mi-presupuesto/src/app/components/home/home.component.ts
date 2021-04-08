import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { MovementsApiClient } from '../../services/movements-api-client.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	public balance: number;
  public name: string;
  public email: string;
  public date: string;

  constructor(public movementsApiClient: MovementsApiClient) {
  	movementsApiClient.subscribeOnChangeBalance(balance => this.balance = balance);
    this.name = this.movementsApiClient.getName();
    this.email = this.movementsApiClient.getEmail();
    this.date = formatDate(new Date(), 'dd/MM/yyyy', 'en');
  }

  ngOnInit(): void {}

  getMovements() {
  	return this.movementsApiClient.getLastMovements();
  }

  trackElement(index: number, element: any) {
  	return element ? element.id : null; 
  }

}
