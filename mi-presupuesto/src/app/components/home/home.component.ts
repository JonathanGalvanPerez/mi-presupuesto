import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { MovementsApiClient } from '../../services/movements-api-client.service';
import { Movement } from '../../models/movement.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	public balance: number;
  public name: string;
  public email: string;
  public today: Date;
  public movements: Movement[];

  constructor(public movementsApiClient: MovementsApiClient) {
  	movementsApiClient.subscribeOnChangeBalance(balance => this.balance = balance);
    movementsApiClient.subscribeOnChangeMovements(movements => this.movements = movements.slice(0,10));
    this.name = this.movementsApiClient.getName();
    this.email = this.movementsApiClient.getEmail();
    this.today = new Date();
  }

  ngOnInit(): void {}

  trackElement(index: number, element: any) {
  	return element ? element.id : null; 
  }

}
